import { useWeather } from '@hooks/useWeather';
import TodayForecast from '@modules/Home/TodayForecast';
import WeekForecast from '@modules/Home/WeekForecast';
import { useLocation } from '@providers/LocationProvider';
import React from 'react';

const Home = () => {
  const { location } = useLocation();
  const { current, forecast, loading } = useWeather(location);

  if (loading) return <p>Loading...</p>;

  if (!current || !forecast) return <p>Weather data unavailable</p>;

  return (
    <>
      <TodayForecast data={current} />
      <WeekForecast data={forecast} />
    </>
  );
};

export default Home;
