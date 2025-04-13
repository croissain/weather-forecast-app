import Card from '@components/Card';
import Icon from '@components/Icon';
import { Typography } from '@components/Typography';
import WeatherIcon from '@components/WeatherIcon';
import Flex from '@layouts/Flex';
import { TCurrentWeather } from '@types';
import { format } from 'date-fns';
import React from 'react';

import s from './style.module.scss';

interface TodayForecastProps {
  data?: TCurrentWeather;
}

const TodayForecast = ({ data }: TodayForecastProps) => {
  return (
    <Card className={s.todayForecast}>
      <Typography variant="body">
        {format(new Date(), 'MMMM dd, yyyy')}
      </Typography>
      <Flex justify="center" align="center" className={s.todayForecast_main}>
        <WeatherIcon code="10n" size={120} />
        <div>
          <Typography tag="h3" variant="h3">
            {data?.main.temp}°C
          </Typography>
          <Typography>{data?.weather.description}</Typography>
        </div>
      </Flex>
      <Flex justify="evenly">
        <Flex
          direction="column"
          align="center"
          gap="xs"
          className={s.todayForecast_detail}
        >
          <Typography color="secondary">Humidity</Typography>
          <Typography variant="body" weight={600}>
            {data?.main.humidity}{' '}
            <Typography tag="span" variant="description">
              %
            </Typography>
          </Typography>
        </Flex>
        <Flex
          direction="column"
          align="center"
          gap="xs"
          className={s.todayForecast_detail}
        >
          <Typography color="secondary">Winds</Typography>
          <Flex gap="xs" justify="center">
            <div
              className={s.todayForecast_windDeg}
              style={
                { '--wind-deg': `${data?.wind.deg}deg` } as React.CSSProperties
              }
            >
              <Icon name="arrowUp" size={16} />
            </div>
            <Typography variant="body" weight={600}>
              {data?.wind.speed}{' '}
              <Typography tag="span" variant="description">
                m/s
              </Typography>
            </Typography>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          align="center"
          gap="xs"
          className={s.todayForecast_detail}
        >
          <Typography color="secondary">Visibiliy</Typography>
          <Typography variant="body" weight={600}>
            {Number(data?.visibility) / 1000}{' '}
            <Typography tag="span" variant="description">
              km
            </Typography>
          </Typography>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TodayForecast;
