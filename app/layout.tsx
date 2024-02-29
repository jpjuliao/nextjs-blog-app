import Header from '@/components/Header';
import React from 'react';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
