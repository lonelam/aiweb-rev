import { PublicUserPlaceholder } from '@/services/core/user';
import { proxy } from '@umijs/max';

export const state = proxy({
  profile: PublicUserPlaceholder,
});
