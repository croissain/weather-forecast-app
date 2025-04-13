import FullPageLoader from '@components/FullPageLoader';
import { Typography } from '@components/Typography';
import { useWeather } from '@hooks/useWeather';
import TodayForecast from '@modules/Home/TodayForecast';
import WeekForecast from '@modules/Home/WeekForecast';
import { useLocation } from '@providers/LocationProvider';
import React from 'react';

const Home = () => {
  const { location } = useLocation();
  const { current, forecast, loading } = useWeather(location);

  if (loading) return <FullPageLoader />;

  if (!current || !forecast)
    return <Typography>Weather data unavailable</Typography>;

  return (
    <>
      <TodayForecast data={current} />
      <WeekForecast data={forecast} />
    </>
  );
};

export default Home;
