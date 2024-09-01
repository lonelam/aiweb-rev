import { user } from '@/store/user';
import { postTaskCreate } from './base';
export const REMOVE_BG_TEMPLATE_ID = 2;
export async function createRemoveBackgroundTask(
  params: API.IRemoveBgData,
  taskName?: string,
): Promise<API.IPublicTask> {
  return postTaskCreate({
    data: JSON.stringify(params),
    templateId: REMOVE_BG_TEMPLATE_ID,
    name:
      taskName ||
      `${user.state.profile.userName} AI消除 ${new Date().toLocaleString()}`,
  });
}
