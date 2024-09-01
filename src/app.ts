// 运行时配置

import { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { RightRender } from './components/Layout/rightRender';
import { auth } from './store/auth';
import { getAuthHeaders } from './store/auth/state';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<{ name: string }> {
  const { user } = await auth.actions.initializeAuthState();
  return { name: user?.userName || '未登录' };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: true,
    },
    rightRender: RightRender,
  };
};

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (url, options) => {
      if (auth.state.accessToken) {
        options.headers = getAuthHeaders(options.headers);
        return {
          url,
          options,
        };
      }
      return { url, options };
    },
  ],
  responseInterceptors: [],
  baseURL: '/api',
};
