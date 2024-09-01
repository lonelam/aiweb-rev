import { proxy } from '@umijs/max';

export const state = proxy({
  accessToken: localStorage.getItem('jwtToken') || '',
  isLogin: false,
});

export function getAuthHeaders(rawHeaders: any = {}) {
  return {
    ...rawHeaders,
    Authorization: `Bearer ${state.accessToken}`,
  };
}
