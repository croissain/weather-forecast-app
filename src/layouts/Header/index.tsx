import Icon from '@components/Icon';
import { Typography } from '@components/Typography';
import { ROUTE_PATHS } from '@constants';
import Container from '@layouts/Container';
import Flex from '@layouts/Flex';
import React from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="sm">
            <Icon name="location" />
            <Typography variant="h6">Singapore, SG</Typography>
          </Flex>
          <Link to={ROUTE_PATHS.SEARCH}>
            <Icon name="search" />
          </Link>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
