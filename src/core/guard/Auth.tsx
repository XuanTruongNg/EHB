import Loading from 'components/Loading';
import { useAppSelector } from 'core/store';
import { selectUserStore } from 'core/store/selector';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
interface AuthWrapperProps {}

const AuthGuard: React.FunctionComponent<AuthWrapperProps> = () => {
  const navigate = useNavigate();
  const { isTriedLogin, user } = useAppSelector(selectUserStore);

  useEffect(() => {
    if (isTriedLogin && !user?.id) {
      //TODO: send notification
      alert('You are not logged in');
      navigate('/auth/login');
    }
  }, [isTriedLogin, navigate, user?.id]);

  return isTriedLogin ? <Outlet /> : <Loading />;
};

export default AuthGuard;
