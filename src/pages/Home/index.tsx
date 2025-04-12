import { useWeather } from '@hooks/useWeather';
import Container from '@layouts/Container';
import TodayForecast from '@modules/Home/TodayForecast';
import WeekForecast from '@modules/Home/WeekForecast';
import React from 'react';

const Home = () => {
  const { current, forecast, loading } = useWeather();

  if (loading) return <p>Loading...</p>;

  if (!current || !forecast) return <p>Weather data unavailable</p>;

  return (
    <Container>
      <TodayForecast data={current} />
      <WeekForecast data={forecast} />
    </Container>
  );
};

export default Home;
