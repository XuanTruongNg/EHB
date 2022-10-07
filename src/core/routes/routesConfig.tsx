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
import NotFoundPage from 'pages/NotFoundPage';
import OAuthRedirect from 'pages/OAuthRedirect';
import { Navigate } from 'react-router-dom';

export interface SingleRoute {
  path?: string;
  component?: JSX.Element;
  guard?: JSX.Element;
  children?: SingleRoute[];
}

// In routes, that should have component when path is not null
export const ROUTES: SingleRoute[] = [
  { path: '/', component: <Navigate to="/auth/login" replace={true} /> },
  {
    path: '/oauth-redirect',
    guard: <UnAuthGuard />,
    component: <OAuthRedirect />,
  },
  {
    path: '/auth',
    component: <EmptyLayout />,
    guard: <UnAuthGuard />,
    children: [
      { path: '', component: <Navigate to="/404-not-found" replace={true} /> },
      {
        path: 'login',
        component: <AuthLogin />,
      },
    ],
  },
  {
    path: '/dashboard',
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/project',
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/resource',
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_PROJECT_MANAGER, ROLE_ADMIN]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/time-sheet',
    component: <Layout />,
    guard: <AuthGuard acceptRoles={[ROLE_ADMIN, ROLE_EMPLOYEE]} />,
    children: [{ path: '', component: <Demo /> }],
  },
  { path: '/404-not-found', component: <NotFoundPage /> },
  {
    path: '*',
    component: <Navigate to="/404-not-found" replace={true} />,
  },
];
