import './App.module.scss';

import MainLayout from '@layouts';
import { LocationProvider } from '@providers/LocationProvider';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useRoutesList from './routes/routes';

const App = () => {
  const { routes } = useRoutesList();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          {(Object.keys(routes) as Array<keyof typeof routes>).map(
            (ele, index) => {
              if (routes[ele] && routes[ele].childrens) {
                return (
                  <Route
                    key={`router-${ele}-${index.toString()}`}
                    element={routes[ele].element}
                  >
                    {routes[ele].childrens?.map((child, childIndex) => (
                      <Route
                        key={`router-${ele}-${childIndex.toString()}`}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                  </Route>
                );
              }
              return (
                <Route
                  key={`router-${ele}-${index.toString()}`}
                  path={routes[ele].path}
                  element={routes[ele].element}
                />
              );
            },
          )}
        </Route>
      </Routes>
    </Suspense>
  );
};

const AppProvider = () => {
  return (
    <BrowserRouter>
      <LocationProvider>
        <App />
      </LocationProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
