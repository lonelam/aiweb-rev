import { createRemoveBackgroundTask } from '@/services/tasks';
import { task } from '@/store/task';
import { derive, useRequest, useSnapshot } from '@umijs/max';
import { Card, Col, Image, Row, Spin, UploadFile } from 'antd';
import { useEffect, useMemo, useState } from 'react';

export interface ITaskListProps {
  uploadedFileList: UploadFile<any>[];
}

const RemoveBgTaskList = (props: ITaskListProps) => {
  const { uploadedFileList } = props;
  const [currentTask, setCurrentTask] = useState<number | null>(null);
  const [taskIds, setTaskIds] = useState<number[]>([]);

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

  const taskListInState = useMemo(() => {
    return derive({
      taskList: (get) => {
        const { resolvedTasks, pendingTasks } = get(task.state);
        return taskIds.map((tid) => {
          if (resolvedTasks.has(tid)) {
            return resolvedTasks.get(tid);
          }
          if (pendingTasks.has(tid)) {
            return pendingTasks.get(tid);
          }
          return createdTaskList?.find((t) => t.id === tid);
        }) as API.IPublicTask[];
      },
    });
  }, [taskIds]);

  const { taskList } = useSnapshot(taskListInState);

  // Set initial task to the first one
  useEffect(() => {
    if (createdTaskList && createdTaskList.length > 0) {
      setCurrentTask(0);
      task.actions.appendNewCreatedTasks(createdTaskList);
      setTaskIds(createdTaskList.map((t) => t.id));

      // Start polling every 5 seconds
      const pollingInterval = setInterval(
        task.actions.batchFetchPendingTasks,
        1000,
      );

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
        {currentTask !== null ? (
          taskList[currentTask].status === 'success' ? (
            <Image
              src={JSON.stringify(taskList[currentTask].resultData)}
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
                onClick={() => setCurrentTask(index)}
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
