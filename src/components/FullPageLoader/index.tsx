import React from 'react';

import s from './style.module.scss';

const FullPageLoader = () => {
  return (
    <div className={s.overlay}>
      <div className={s.spinner} />
    </div>
  );
};

export default FullPageLoader;
