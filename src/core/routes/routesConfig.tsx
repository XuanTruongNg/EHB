import {
  ROLE_ADMIN,
  ROLE_EMPLOYEE,
  ROLE_PROJECT_MANAGER,
} from 'core/constant/role';
import AuthGuard from 'core/guard/Auth';
import UnAuthGuard from 'core/guard/UnAuth';
import EmptyLayout from 'core/layout/EmptyLayout';
import Layout from 'core/layout/Layout';
import AuthLogin from 'pages/AuthLogin';
import Demo from 'pages/Demo';
import Resource from 'pages/Resource';
import NotFoundPage from 'pages/NotFoundPage';
import OAuthRedirect from 'pages/OAuthRedirect';
import { Navigate } from 'react-router-dom';
import {
  AUTH,
  OAUTH_REDIRECT,
  NOT_FOUND_PAGE,
  LOGIN,
  DASHBOARD,
  PROJECT,
  RESOURCE,
  TIME_SHEET,
  AUTH_LOGIN,
} from 'core/constant';

export interface SingleRoute {
  path?: string;
  component?: JSX.Element;
  guard?: JSX.Element;
  children?: SingleRoute[];
}

// In routes, that should have component when path is not null
export const ROUTES: SingleRoute[] = [
  { path: '/', component: <Navigate to={AUTH_LOGIN} replace={true} /> },
  {
    path: OAUTH_REDIRECT,
    guard: <UnAuthGuard />,
    component: <OAuthRedirect />,
  },
  {
    path: AUTH,
    component: <EmptyLayout />,
    guard: <UnAuthGuard />,
    children: [
      { path: '', component: <Navigate to={NOT_FOUND_PAGE} replace={true} /> },
      {
        path: LOGIN,
        component: <AuthLogin />,
      },
    ],
  },
  {
    path: DASHBOARD,
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: PROJECT,
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: RESOURCE,
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Resource /> }],
  },
  {
    path: TIME_SHEET,
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_ADMIN, ROLE_EMPLOYEE]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  { path: NOT_FOUND_PAGE, component: <NotFoundPage /> },
  {
    path: '*',
    component: <Navigate to={NOT_FOUND_PAGE} replace={true} />,
  },
];
