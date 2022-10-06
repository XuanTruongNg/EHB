import Loading from 'components/Loading';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store';
import { selectUserStore } from '../store/selector';

interface UnAuthGuardProps {}

const UnAuthGuard: React.FunctionComponent<UnAuthGuardProps> = () => {
  const { isTriedLogin, user } = useAppSelector(selectUserStore);

  if (!isTriedLogin) return <Loading />;

  if (user?.id) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default UnAuthGuard;
