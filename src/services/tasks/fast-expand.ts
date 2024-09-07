import { config } from '@/store/config';
import { user } from '@/store/user';
import { postTaskCreate } from './base';
export async function createFastExpandTask(
  params: API.IFastExpandData,
  taskName?: string,
): Promise<API.IPublicTask> {
  return postTaskCreate({
    data: JSON.stringify(params),
    templateId: config.state.template.fastExpandTemplateId,
    name:
      taskName ||
      `${user.state.profile.userName} AI扩图 ${new Date().toLocaleString()}`,
  });
}
