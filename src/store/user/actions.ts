import { state } from './state';

export const actions = {
  setUserProfile(newProfile: API.IPublicUser) {
    state.profile = newProfile;
  },
};
