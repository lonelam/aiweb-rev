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
