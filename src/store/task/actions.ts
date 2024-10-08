import { postTaskBatchFetch } from '@/services/tasks';
import { state } from './state';

export const actions = {
  appendNewCreatedTasks(createdTasks: API.IPublicTask[]) {
    createdTasks.forEach((t) => {
      state.pendingTasks.set(t.id, t);
    });
  },
  resolveTasks(resolvedTasks: API.IPublicTask[]) {
    resolvedTasks.forEach((t) => {
      if (t.status === 'success') {
        state.pendingTasks.delete(t.id);
        state.resolvedTasks.set(t.id, t);
      }
    });
  },
  async batchFetchPendingTasks() {
    const taskIds = Array.from(state.pendingTasks.keys());
    if (!taskIds.length) {
      return;
    }
    const { tasks: latestTasks } = await postTaskBatchFetch({ taskIds });
    latestTasks.forEach((t) => {
      if (t.status === 'success') {
        state.pendingTasks.delete(t.id);
        state.resolvedTasks.set(t.id, t);
      } else if (t.status === 'failed') {
        state.pendingTasks.delete(t.id);
      } else {
        state.pendingTasks.set(t.id, t);
      }
    });
    if (state.isPollingTasks) {
      setTimeout(() => {
        if (state.isPollingTasks) {
          actions.batchFetchPendingTasks();
        }
      }, 500);
    }
  },
  async startPollingTasks() {
    state.isPollingTasks = true;
    actions.batchFetchPendingTasks();
  },
  async stopPollingTasks() {
    state.isPollingTasks = false;
  },
};
