import { request } from '@umijs/max';

export async function postAuthLogin(
  data: API.ILoginByEmailParams,
): Promise<API.IAccessToken> {
  return request('/auth/login', {
    method: 'POST',
    data,
  });
}
