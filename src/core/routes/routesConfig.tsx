import { Navigate } from 'react-router-dom';
import Demo from 'pages/Demo';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFoundPage from 'pages/NotFoundPage';
import EmptyLayout from 'core/layout/EmptyLayout';
import UnAuthGuard from 'core/guard/UnAuth';
import AuthGuard from 'core/guard/Auth';

export interface SingleRoute {
  path?: string;
  component?: JSX.Element;
  guard?: JSX.Element;
  children?: SingleRoute[];
}

// In routes, that should have component when path is not null
export const ROUTES: SingleRoute[] = [
  { path: '/', component: <Home /> },
  {
    path: '/auth',
    component: <EmptyLayout />,
    guard: <UnAuthGuard />,
    children: [
      { path: '', component: <Navigate to="/404-not-found" /> },
      {
        path: 'login',
        component: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    component: <EmptyLayout />,
    guard: <AuthGuard />,
    children: [{ path: '', component: <Demo /> }],
  },
  { path: '/404-not-found', component: <NotFoundPage /> },
  {
    path: '*',
    component: <Navigate to="/404-not-found" />,
  },
];
