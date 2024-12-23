import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, Outlet } from 'react-router-dom';
import { Layout, theme, ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Login, { loginAction } from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import DynamicBreadcrumb from './utils/DynamicBreadcrumbs';
import Signup, { signupAction } from './components/Signup';
import Account, { updateAccountAction } from './components/Account';

const { Content } = Layout;

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Root layout component
const RootLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ padding: '0 48px' }}>
        <DynamicBreadcrumb />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

// Protected route loader
const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect('/login');
  }
  return null;
};

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
        action: signupAction
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: protectedLoader,
      },
      {
        path: 'account',
        element: <Account />,
        loader: protectedLoader,
        action: updateAccountAction
      },
      {
        path: '/',
        loader: protectedLoader,
        element: <Dashboard />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default App;
