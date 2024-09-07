import { task } from '@/store/task';
import { useRequest } from '@umijs/max';
import { Spin, UploadFile } from 'antd';
import { useEffect } from 'react';
export interface ICreatingTasksProps {
  uploadedFileList: UploadFile<any>[];
  setTaskIds: (taskIds: number[]) => void;
  createTaskFn: (
    params: API.IBaseImageData & API.IBasePromptData,
    taskName?: string,
  ) => Promise<API.IPublicTask>;
}
const ImagePromptTasksCreator = (props: ICreatingTasksProps) => {
  const { uploadedFileList, setTaskIds, createTaskFn } = props;
  const { loading, data: createdTaskList } = useRequest<{
    data: API.IPublicTask[];
  }>(async () => {
    const combinedResponse = await Promise.all(
      uploadedFileList.map((f) => {
        return createTaskFn({
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

export default ImagePromptTasksCreator;
