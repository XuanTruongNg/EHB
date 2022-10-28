import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "components/Loading";
import { AUTH_LOGIN, NOT_FOUND_PAGE } from "core/constant";
import { Role } from "core/interface/role";
import { useAppSelector } from "core/store";
import { selectIsAuthenticated, selectUserRoleNames, selectUserStore } from "core/store/selector";

interface AuthWrapperProps {
  acceptRoles: Role[];
}

const AuthGuard: FC<AuthWrapperProps> = ({ acceptRoles }) => {
  const userRoles = useAppSelector(selectUserRoleNames);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { isTriedLogin } = useAppSelector(selectUserStore);
  if (!isTriedLogin) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to={AUTH_LOGIN} replace />;
  }

  if (acceptRoles.findIndex((item) => userRoles?.includes(item)) === -1) {
    return <Navigate to={NOT_FOUND_PAGE} replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
