import { defineConfig } from '@umijs/max';
import * as chalk from 'chalk';

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
      redirect: '/tools/remove-bg',
      // component: './Home',
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
    {
      name: 'register',
      path: '/register',
      component: './Register',
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
    '/api':
      process.env.API_ENV === 'local'
        ? {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            verbose: true,
          }
        : {
            target: 'https://aiweb.laizn.com/',
            changeOrigin: true,
            verbose: true,
            bypass: (req, resp, options) => {
              console.log(
                chalk.gray(
                  `Proxying ${chalk.white(req.method)} ${chalk.blue(req.url)} to ${chalk.blueBright(options.target)}: ${resp.statusCode === 200 ? chalk.greenBright(JSON.stringify(resp.statusCode)) : chalk.yellowBright(resp.statusCode)}`,
                ),
              );
              return null;
            },
          },
  },
  tailwindcss: {},
  analytics: {
    baidu: 'aa4edda23a24c2a31b43ac8101f0c405',
    ga_v2: 'G-KG8DE7YLDH',
  },
});
