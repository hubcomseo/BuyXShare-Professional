import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './AppShell';

export const CheckoutShell = () => {
  return (
    <AppShell className="bg-surface-elevated">
       <div className="w-full max-w-md mx-auto min-h-screen bg-surface md:border-x md:border-border-subtle shadow-xl shadow-black/5">
          <Outlet />
       </div>
    </AppShell>
  );
};
