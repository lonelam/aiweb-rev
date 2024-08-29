// 运行时配置

import { RequestConfig } from '@umijs/max';
import { auth } from './store/auth';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: true,
    },
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
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.state.accessToken}`,
        };
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
