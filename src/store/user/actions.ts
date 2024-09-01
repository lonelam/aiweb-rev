import { PublicUserPlaceholder } from '@/services/core/user';
import { state } from './state';

export const actions = {
  setUserProfile(newProfile: API.IPublicUser) {
    state.profile = newProfile;
  },
  reset() {
    state.profile = PublicUserPlaceholder;
  },
};
