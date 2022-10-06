import { Navigate } from 'react-router-dom';
import Demo from 'pages/Demo';
import Home from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import EmptyLayout from 'core/layout/EmptyLayout';
import UnAuthGuard from 'core/guard/UnAuth';
import AuthLogin from 'pages/AuthLogin';
import Layout from 'core/layout/Layout';
import AuthGuard from 'core/guard/Auth';
import OAuthRedirect from 'pages/OAuthRedirect';

export interface SingleRoute {
  path?: string;
  component?: JSX.Element;
  guard?: JSX.Element;
  children?: SingleRoute[];
}

// In routes, that should have component when path is not null
export const ROUTES: SingleRoute[] = [
  { path: '/', component: <Home /> },
  { path: '/oauth-redirect', component: <OAuthRedirect /> },
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
    guard: <AuthGuard />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/project',
    component: <Layout />,
    guard: <AuthGuard />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/resource',
    component: <Layout />,
    guard: <AuthGuard />,
    children: [{ path: '', component: <Demo /> }],
  },
  {
    path: '/time-sheet',
    component: <Layout />,
    guard: <AuthGuard />,
    children: [{ path: '', component: <Demo /> }],
  },
  { path: '/404-not-found', component: <NotFoundPage /> },
  {
    path: '*',
    component: <Navigate to="/404-not-found" replace={true} />,
  },
];
