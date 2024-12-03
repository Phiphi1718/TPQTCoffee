import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Đây là nơi các route con sẽ được render */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
