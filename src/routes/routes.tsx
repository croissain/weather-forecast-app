import { ROUTE_PATHS } from '@constants';
import React, { lazy, useMemo } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Search = lazy(() => import('@pages/Search'));

type RouteType = {
  path?: string;
  element: React.ReactNode;
  isProtected: boolean;
  childrens?: Array<RouteType>;
};

const useRoutesList = () => {
  const routes: { [key: string]: RouteType } = useMemo(
    () => ({
      home: {
        path: ROUTE_PATHS.HOME,
        element: <Home />,
        isProtected: false,
      },
      search: {
        path: ROUTE_PATHS.SEARCH,
        element: <Search />,
        isProtected: false,
      },
    }),
    [],
  );

  return {
    routes,
  };
};

export default useRoutesList;
