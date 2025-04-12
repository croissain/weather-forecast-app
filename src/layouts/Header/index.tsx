import Icon from '@components/Icon';
import { Typography } from '@components/Typography';
import { ROUTE_PATHS } from '@constants';
import Container from '@layouts/Container';
import Flex from '@layouts/Flex';
import { useLocation } from '@providers/LocationProvider';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import s from './style.module.scss';

const Header = () => {
  const { location } = useLocation();
  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <Container>
        <Flex align="center" justify="between">
          <div
            onClick={() => {
              navigate(ROUTE_PATHS.HOME);
            }}
          >
            <Flex align="center" gap="sm">
              <Icon name="location" />
              <Typography variant="h6">
                {location?.name}, {location?.country}
              </Typography>
            </Flex>
          </div>
          <Link to={ROUTE_PATHS.SEARCH}>
            <Icon name="search" />
          </Link>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
