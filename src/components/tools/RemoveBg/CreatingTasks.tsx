import { createRemoveBackgroundTask } from '@/services/tasks';
import { task } from '@/store/task';
import { useRequest } from '@umijs/max';
import { Spin, UploadFile } from 'antd';
import { useEffect } from 'react';
export interface ICreatingTasksProps {
  uploadedFileList: UploadFile<any>[];
  setTaskIds: (taskIds: number[]) => void;
}
const CreatingTasks = (props: ICreatingTasksProps) => {
  const { uploadedFileList, setTaskIds } = props;
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
      task.actions.appendNewCreatedTasks(createdTaskList);
      console.log(`setting tasks: ${createdTaskList.map((t) => t.id)}`);
      setTaskIds(createdTaskList.map((t) => t.id));

      task.actions.startPollingTasks();
    }
  }, [createdTaskList, setTaskIds]);

  useEffect(() => {
    if (!loading) {
    }
  }, [loading]);
  return <Spin />;
};

export default CreatingTasks;
