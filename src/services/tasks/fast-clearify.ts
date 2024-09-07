import { config } from '@/store/config';
import { user } from '@/store/user';
import { postTaskCreate } from './base';
export async function createFastClearifyTask(
  params: API.IFastClearifyData,
  taskName?: string,
): Promise<API.IPublicTask> {
  return postTaskCreate({
    data: JSON.stringify(params),
    templateId: config.state.template.fastClearifyTemplateId,
    name:
      taskName ||
      `${user.state.profile.userName} 变清晰 ${new Date().toLocaleString()}`,
  });
}
