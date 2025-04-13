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
          <button
            className={s.header_location}
            type="button"
            onClick={() => {
              navigate(ROUTE_PATHS.HOME);
            }}
          >
            <Flex align="center" gap="sm">
              {location?.name && (
                <>
                  <Icon name="location" className={s.header_icon} />
                  <Typography variant="h6" className={s.header_city}>
                    {location?.name}, {location?.country}
                  </Typography>
                </>
              )}
            </Flex>
          </button>
          <Link to={ROUTE_PATHS.SEARCH} className={s.header_search}>
            <Icon name="search" className={s.header_icon} />
          </Link>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
