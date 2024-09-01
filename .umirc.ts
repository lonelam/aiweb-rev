import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  valtio: {},
  title: 'The AI Toolbox',
  layout: {
    title: 'The AI Toolbox',
    locale: true,
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'home',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: 'start',
    //   path: '/start',
    //   component: './Start',
    // },
    // {
    //   name: '管理',
    //   path: '/admin',
    //   component: './Admin',
    //   access: 'admin',
    // },
    {
      name: 'remove-bg',
      path: '/tools/remove-bg',
      component: './Tools/RemoveBg',
      wrappers: ['@/wrappers/auth-routes'],
    },
    {
      name: 'login',
      path: '/login',
      component: './Login',
      layout: false,
    },
    process.env.NODE_ENV === 'development'
      ? {
          name: 'dev',
          path: '/dev',
          component: './Dev',
          wrappers: ['@/wrappers/auth-routes'],
        }
      : {},
  ],

  npmClient: 'pnpm',
  plugins: [],
  mako: {},
  locale: {
    title: true,
    antd: true,
    default: 'zh-CN',
    baseSeparator: '-',
  },
  proxy: {
    '/api': {
      target: 'https://aiweb.laizn.com/',
      changeOrigin: true,
      verbose: true,
    },
  },
  tailwindcss: {},
});
