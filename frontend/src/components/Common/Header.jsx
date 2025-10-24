import React from 'react';
import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="border-b border-gray-200 sticky -top-8 bg-white z-10 shadow">
      {/* Topbar
        Navbar 
        Cart Drawer */}
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
