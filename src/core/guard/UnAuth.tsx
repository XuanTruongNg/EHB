import Loading from 'components/Loading';
import {
  ROLE_ADMIN,
  ROLE_EMPLOYEE,
  ROLE_PROJECT_MANAGER,
} from 'core/constant/role';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store';
import {
  selectIsAuthenticated,
  selectUserRoleNames,
  selectUserStore,
} from '../store/selector';

interface UnAuthGuardProps {}

const UnAuthGuard: React.FunctionComponent<UnAuthGuardProps> = () => {
  const { isTriedLogin } = useAppSelector(selectUserStore);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRoles = useAppSelector(selectUserRoleNames);

  if (!isTriedLogin) return <Loading />;
  if (isAuthenticated) {
    if (
      userRoles?.includes(ROLE_ADMIN) ||
      userRoles?.includes(ROLE_PROJECT_MANAGER)
    )
      return <Navigate to="/dashboard" replace />;

    if (userRoles?.includes(ROLE_EMPLOYEE))
      return <Navigate to="/time-sheet" replace />;
  }

  return <Outlet />;
};

export default UnAuthGuard;
