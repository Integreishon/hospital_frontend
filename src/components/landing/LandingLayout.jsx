import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';
import LandingFooter from './LandingFooter';
import FloatingActionButtons from './FloatingActionButtons';

const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <LandingFooter />
      <FloatingActionButtons />
    </div>
  );
};

export default LandingLayout; 