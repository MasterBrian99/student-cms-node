import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AuthLayout = React.lazy(() => import('./app/auth/layout/layout'));
const MainLayout = React.lazy(() => import('./app/main/layout/layout'));
const LoginPage = React.lazy(() => import('./app/auth/pages/login-page/login-page'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
