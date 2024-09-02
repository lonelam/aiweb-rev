import { proxy, proxyMap } from '@umijs/max';

export const state = proxy({
  pendingTasks: proxyMap<number, API.IPublicTask>(),
  resolvedTasks: proxyMap<number, API.IPublicTask>(),
});
