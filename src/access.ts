import { auth } from './store/auth';
import { user } from './store/user';

export default () => {
  const { role } = user.state.profile;
  const { isLogin } = auth.state;
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const canSeeAdmin = isLogin && role === 'admin';
  return {
    canSeeAdmin,
  };
};
