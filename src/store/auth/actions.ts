import { getUserInfo } from '@/services/core/user';
import { user } from '../user';
import { state } from './state';

export const actions = {
  async setAccessTokenAndLogin(newToken: string): Promise<API.IPublicUser> {
    state.accessToken = newToken;
    localStorage.setItem('jwtToken', newToken);
    const userInfo = await getUserInfo();
    state.isLogin = true;
    user.actions.setUserProfile(userInfo);
    return userInfo;
  },

  async initializeAuthState(): Promise<{ user?: API.IPublicUser }> {
    if (!state.isLogin && state.accessToken) {
      const userInfo = await getUserInfo();
      state.isLogin = true;
      user.actions.setUserProfile(userInfo);
      return { user: userInfo };
    }
    return {};
  },

  async logoutAndClearAccessToken() {
    state.accessToken = '';
    localStorage.removeItem('jwtToken');
    state.isLogin = false;
    user.actions.reset();
  },
};
