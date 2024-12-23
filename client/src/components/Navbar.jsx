import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const Navbar = () => {
  const { Header } = Layout;
  const location = useLocation();
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/account', label: 'Account' },
  ];
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('1');

  React.useEffect(() => {
    const selectedRoute = routes.find(route => route.path === location.pathname);
    const selectedKey = routes.indexOf(selectedRoute) + 1;
    setSelectedMenuItem(selectedKey.toString());
  }, [location]);

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedMenuItem]}>
        {localStorage.getItem('token') && routes.map((route, index) => (
          <Menu.Item key={(index + 1).toString()}>
            <Link to={route.path}>{route.label}</Link>
          </Menu.Item>
        ))}
        {localStorage.getItem('token') ? (
          <Menu.Item key="4">
            <a href="/login" onClick={() => localStorage.removeItem('token')}>Logout</a>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="3">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  )
};

export default Navbar;