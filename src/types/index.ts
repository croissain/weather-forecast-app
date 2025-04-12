export type TCoord = {
  lon: number;
  lat: number;
};

export type TWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type TMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type TWind = {
  speed: number;
  deg: number;
};

export type TSys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type TCity = {
  id: number;
  name: string;
  coord: TCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type TCurrentWeather = {
  coord: TCoord;
  weather: TWeather;
  base: string;
  main: TMain;
  visibility: number;
  wind: TWind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: TSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type TForecastWeather = Array<
  Omit<TCurrentWeather, 'weather'> & { weather: Array<TWeather> }
>;

export type TForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: TForecastWeather;
  city: TCity;
};
