import Loading from 'components/Loading';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store';
import { selectUserStore } from '../store/selector';

interface UnAuthGuardProps {}

const UnAuthGuard: React.FunctionComponent<UnAuthGuardProps> = () => {
  const navigate = useNavigate();
  const { isTriedLogin, user } = useAppSelector(selectUserStore);

  useEffect(() => {
    if (isTriedLogin && user?.id) {
      //TODO: send notification
      navigate('/');
    }
  }, [isTriedLogin, user?.id, navigate]);

  return isTriedLogin ? <Outlet /> : <Loading />;
};

export default UnAuthGuard;
