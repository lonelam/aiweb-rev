import { config } from '@/store/config';
import { user } from '@/store/user';
import { postTaskCreate } from './base';
export async function createFastRemoveObjectTask(
  params: API.IFastExpandData,
  taskName?: string,
): Promise<API.IPublicTask> {
  return postTaskCreate({
    data: JSON.stringify(params),
    templateId: config.state.template.fastRemoveObjectTemplateId,
    name:
      taskName ||
      `${user.state.profile.userName} AI消除 ${new Date().toLocaleString()}`,
  });
}
