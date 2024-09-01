import { createRemoveBackgroundTask, getTask } from '@/services/tasks';
import { useRequest } from '@umijs/max';
import { Card, Col, Image, Row, Spin, UploadFile } from 'antd';
import { useEffect, useState } from 'react';

export interface ITaskListProps {
  uploadedFileList: UploadFile<any>[];
}

const RemoveBgTaskList = (props: ITaskListProps) => {
  const { uploadedFileList } = props;
  const [currentTask, setCurrentTask] = useState<API.IPublicTask | null>(null);
  const [taskList, setTaskList] = useState<API.IPublicTask[]>([]);

  // Function to fetch updated task status
  const fetchTaskStatus = async () => {
    if (taskList.length > 0) {
      const updatedTasks = await Promise.all(
        taskList.map(async (task) => {
          if (task.status === 'success' || task.status === 'failed') {
            return task;
          }
          const updatedTask = await getTask(task.id); // Assuming getTask(id) fetches task status by ID
          return updatedTask;
        }),
      );
      setTaskList(updatedTasks);

      // Update current task if it's still in progress or not the one currently selected
      if (currentTask && updatedTasks.some((t) => t.id === currentTask.id)) {
        setCurrentTask(
          updatedTasks.find((t) => t.id === currentTask.id) || null,
        );
      }
    }
  };

  console.warn(`the task list is now`, taskList);
  const { loading, data: createdTaskList } = useRequest<{
    data: API.IPublicTask[];
  }>(async () => {
    const combinedResponse = await Promise.all(
      uploadedFileList.map((f) => {
        return createRemoveBackgroundTask({
          image: f.response.url || '',
          prompt: '',
        });
      }),
    );
    return { data: combinedResponse };
  });

  // Set initial task to the first one
  useEffect(() => {
    if (createdTaskList && createdTaskList.length > 0) {
      setCurrentTask(createdTaskList[0]);
      setTaskList(createdTaskList);

      // Start polling every 5 seconds
      const pollingInterval = setInterval(fetchTaskStatus, 1000);

      // Cleanup polling on component unmount
      return () => clearInterval(pollingInterval);
    }
  }, [createdTaskList]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="flex flex-col">
      {/* Main Image Viewer */}
      <div
        className="min-h-[50vh] flex justify-center items-center"
        style={{ marginBottom: '16px', textAlign: 'center' }}
      >
        {currentTask ? (
          currentTask.status === 'success' ? (
            <Image
              src={JSON.stringify(currentTask.resultData)}
              alt="Current Preview"
              width="80%"
              height="auto"
              style={{
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
              fallback="https://via.placeholder.com/800"
            />
          ) : (
            <Spin />
          )
        ) : (
          <div>No Image Selected</div>
        )}
      </div>

      {/* Scrollable Image List */}
      <div
        className="w-full"
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '16px',
        }}
      >
        <Row gutter={[16, 16]} className="flex flex-nowrap flex-row">
          {taskList?.map((task, index) => (
            <Col key={index}>
              <Card
                bordered={true}
                style={{
                  width: '150px',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentTask(task)}
                cover={
                  task.status === 'success' ? (
                    <Image
                      src={JSON.parse(task.data).image}
                      alt={`Thumbnail of task ${index + 1}`}
                      width="100%"
                      height="auto"
                      style={{ borderRadius: '8px' }}
                      fallback="https://via.placeholder.com/150"
                    />
                  ) : null
                }
              >
                <Spin />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default RemoveBgTaskList;
