import Card from '@components/Card';
import { Typography } from '@components/Typography';
import WeatherIcon from '@components/WeatherIcon';
import Flex from '@layouts/Flex';
import { TForecastWeather } from '@types';
import { getHHmm } from '@utils';
import { format, isToday } from 'date-fns';
import React, { useMemo } from 'react';

import s from './style.module.scss';

interface ForecastRowProps {
  time: string;
  weather: {
    code: string;
    description: string;
  };
  temp: {
    max: number;
    min: number;
  };
}

interface WeekForecastProps {
  data?: TForecastWeather;
}

const ForecastRow = ({ time, weather, temp }: ForecastRowProps) => {
  return (
    <Flex justify="start" align="center">
      <Typography weight={600} variant="body">
        {time}
      </Typography>
      <Flex align="center" gap="none" className={s.forecastRow_temp}>
        <WeatherIcon code={weather.code} size={52} />
        <Typography color="secondary">
          {temp.max.toFixed(2)}/{temp.min.toFixed(2)}°C
        </Typography>
      </Flex>
      <Typography weight={600}>{weather.description}</Typography>
    </Flex>
  );
};

const WeekForecast = ({ data }: WeekForecastProps) => {
  const groupedData = useMemo(() => {
    if (!data) return {};

    return data.reduce(
      (acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'MMMM dd');
        if (!acc[date]) acc[date] = [];
        acc[date].push(forecast);
        return acc;
      },
      {} as Record<string, typeof data>,
    );
  }, [data]);

  return (
    <>
      <Typography variant="body" weight={600} className={s.weekForecast_label}>
        5-day Forecast (3 Hours)
      </Typography>
      <Card className={s.weekForecast}>
        {Object.entries(groupedData).map(([date, items], index) => (
          <div key={date} className={s.weekForecast_group}>
            <Typography color="secondary" className={s.weekForecast_groupLabel}>
              {index === 0 && isToday(new Date(items[0].dt * 1000))
                ? 'Today'
                : date}
            </Typography>
            <Flex direction="column" gap="none">
              {items.map((forecast) => (
                <ForecastRow
                  key={forecast.dt}
                  time={getHHmm(forecast.dt)}
                  temp={{
                    max: forecast.main.temp_max,
                    min: forecast.main.temp_min,
                  }}
                  weather={{
                    code: forecast.weather[0].icon,
                    description: forecast.weather[0].description,
                  }}
                />
              ))}
            </Flex>
          </div>
        ))}
      </Card>
    </>
  );
};

export default WeekForecast;
