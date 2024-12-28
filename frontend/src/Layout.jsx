import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav'; 

const Layout = () => {
  return (
    <div>
      <Nav /> 
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
