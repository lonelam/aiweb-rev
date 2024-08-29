import { auth } from '@/store/auth';
import { Navigate, Outlet, useSnapshot } from '@umijs/max';

export default () => {
  const { isLogin } = useSnapshot(auth.state);
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
