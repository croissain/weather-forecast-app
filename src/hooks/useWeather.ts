import { TCurrentWeather, TForecastWeather } from '@types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useWeather() {
  const [current, setCurrent] = useState<TCurrentWeather | null>(null);
  const [forecast, setForecast] = useState<TForecastWeather>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  useEffect(() => {
    function fetchWeather(lat: number, lon: number) {
      const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      Promise.all([axios.get(currentURL), axios.get(forecastURL)])
        .then(([currentRes, forecastRes]) => {
          setCurrent(currentRes.data);
          setForecast(forecastRes.data.list);
        })
        .catch((err) => {
          setError('Failed to fetch weather data');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError('Geolocation permission denied');
          setLoading(false);
        },
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  return {
    current,
    forecast,
    location: {
      label: `${current?.name}, ${current?.sys.country}`,
      value: current?.id,
    },
    loading,
    error,
  };
}
