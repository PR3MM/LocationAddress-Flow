import React from 'react';
import { NavLink } from 'react-router-dom'; 

const Nav = () => {
  return (
    <div className=''>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Location Flow</h1>
          <div>
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                `mx-2 ${isActive ? 'text-blue-500 font-semibold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/addresses"
              className={({ isActive }) =>
                `mx-2 ${isActive ? 'text-blue-500 font-semibold' : ''}`
              }
            >
              Saved Addresses
            </NavLink> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
