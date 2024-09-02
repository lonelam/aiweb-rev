import { request } from '@umijs/max';

export const PublicUserPlaceholder: API.IPublicUser = {
  id: 0,
  email: '',
  userName: '',
  phone: '',
  firstName: '',
  lastName: '',
  role: 'normal',
  authorityKeys: [],
};

export async function getUserInfo(): Promise<API.IPublicUser> {
  return request('/user/profile');
}

export async function postAuthRegister(data: API.IRegisterUser) {
  return request('/user/register', {
    method: 'POST',
    data,
  });
}
