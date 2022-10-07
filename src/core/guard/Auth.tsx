import Loading from 'components/Loading';
import { Role } from 'core/interface/role';
import { useAppSelector } from 'core/store';
import {
  selectIsAuthenticated,
  selectUserRoleNames,
  selectUserStore,
} from 'core/store/selector';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthWrapperProps {
  acceptRoles: Role[];
}

const AuthGuard: React.FunctionComponent<AuthWrapperProps> = ({
  acceptRoles,
}) => {
  const userRoles = useAppSelector(selectUserRoleNames);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isTriedLogin } = useAppSelector(selectUserStore);
  if (!isTriedLogin) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (
    acceptRoles.findIndex((item) => {
      return userRoles?.includes(item);
    }) === -1
  ) {
    return <Navigate to="/404-not-found" replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
