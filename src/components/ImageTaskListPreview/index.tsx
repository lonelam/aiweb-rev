import { task } from '@/store/task';
import { ProCard } from '@ant-design/pro-components';
import { derive, useSnapshot } from '@umijs/max';
import { Col, Image, Row, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';

export interface ITaskListProps {
  taskIds: number[];
}

const ImageTaskListPreview = (props: ITaskListProps) => {
  const { taskIds } = props;
  const [currentTask, setCurrentTask] = useState<number>(0);
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
          return taskIds?.find((t) => t === tid);
        }) as API.IPublicTask[];
      },
    });
  }, [taskIds]);
  const { taskList } = useSnapshot(taskListInState);

  // Function to trigger image download
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (taskList.some((t) => t.status !== 'success')) {
      task.actions.startPollingTasks();
    } else {
      taskList.forEach((task, index) => {
        handleDownload(JSON.parse(task.resultData).image, `${index}.png`);
      });
    }
  }, [taskList]);
  return (
    <div className="flex flex-col">
      {/* Main Image Viewer */}
      <div
        className="min-h-[50vh] max-h-[90vh] mb-6 flex items-center justify-center"
        style={{ textAlign: 'center' }}
      >
        {currentTask !== null ? (
          taskList[currentTask].status === 'success' ? (
            <div className="bg-transparent-mosaic flex w-full">
              <Image
                rootClassName="w-full"
                src={JSON.parse(taskList[currentTask].resultData).image}
                alt="Current Preview"
                fallback="https://via.placeholder.com/800"
              />
            </div>
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
              <ProCard
                className={`inline-flex justify-center items-center min-h-36  overflow-hidden w-36 cursor-pointer transition-none border-4 rounded-xl ${currentTask === index ? ' border-blue-400' : 'border-transparent'}`}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => setCurrentTask(index)}
                ghost
              >
                {task.status !== 'success' ? (
                  <Spin />
                ) : (
                  <>
                    <Image
                      src={JSON.parse(task.data).image}
                      alt={`Thumbnail of task ${index + 1}`}
                      className=""
                      width="100%"
                      height="auto"
                      preview={false}
                      fallback="https://via.placeholder.com/150"
                    />
                  </>
                )}
              </ProCard>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ImageTaskListPreview;
