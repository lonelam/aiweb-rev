import { request } from '@umijs/max';

export async function postTaskCreate(task: API.ICreateTaskParams) {
  return request('/task/create', {
    method: 'POST',
    data: task,
  });
}

export async function getTask(taskId: number) {
  return request(`/task/${taskId}`);
}

export async function postTaskBatchFetch(
  data: API.IBatchFetchTasksParams,
): Promise<{ tasks: API.IPublicTask[] }> {
  return request('/task/batch_fetch', {
    method: 'POST',
    data,
  });
}
