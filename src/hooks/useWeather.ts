import { TCurrentWeather, TForecastWeather } from '@types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type TLocation = {
  lat: number;
  lon: number;
  label?: string;
};

export function useWeather(location?: TLocation | null) {
  const [current, setCurrent] = useState<TCurrentWeather | null>(null);
  const [forecast, setForecast] = useState<TForecastWeather>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(currentURL),
          axios.get(forecastURL),
        ]);
        setCurrent(currentRes.data);
        setForecast(forecastRes.data.list);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    }

    if (location) {
      fetchWeather(location.lat, location.lon);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchWeather(coords.latitude, coords.longitude);
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
  }, [location?.lat, location?.lon]);

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
