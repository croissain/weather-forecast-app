import Header from '@layouts/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './style.module.scss';

const MainLayout = () => {
  return (
    <div className={s.mainLayout}>
      <Header />
      <div className={s.mainLayout_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
