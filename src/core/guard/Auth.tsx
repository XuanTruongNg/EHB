import Loading from 'components/Loading';
import { useAppSelector } from 'core/store';
import { selectUserStore } from 'core/store/selector';
import { Navigate, Outlet } from 'react-router-dom';
interface AuthWrapperProps {}

const AuthGuard: React.FunctionComponent<AuthWrapperProps> = () => {
  const { isTriedLogin, user } = useAppSelector(selectUserStore);

  if (!isTriedLogin) return <Loading />;
  if (user?.id) return <Outlet />;

  alert('You are not logged in');
  return <Navigate to="/auth/login" replace />;
};

export default AuthGuard;
