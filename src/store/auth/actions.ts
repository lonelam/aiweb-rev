import { getUserInfo } from '@/services/core/user';
import { user } from '../user';
import { state } from './state';

export const actions = {
  async setAccessTokenAndLogin(newToken: string): Promise<API.IPublicUser> {
    state.accessToken = newToken;
    localStorage.setItem('jwtToken', newToken);
    const userInfo = await getUserInfo();
    user.actions.setUserProfile(userInfo);
    return userInfo;
  },
};
