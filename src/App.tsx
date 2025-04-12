import { Typography } from '@components/Typography';
import React from 'react';

import styles from './App.module.scss';

export default function App() {
  return (
    <>
      <Typography className={styles.title}>
        Hello, React + TypeScript + SCSS!
      </Typography>
      <p className={styles.title}>Hello, React + TypeScript + SCSS!</p>
    </>
  );
}
