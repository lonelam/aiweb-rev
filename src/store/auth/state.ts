import { proxy } from '@umijs/max';

export const state = proxy({
  accessToken: localStorage.getItem('jwtToken') || '',
  isLogin: false,
});
