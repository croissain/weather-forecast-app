import React from 'react';

type WeatherIconProps = {
  code: string;
  alt?: string;
  size?: number;
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  alt = 'Weather Icon',
  size = 64,
}) => {
  const src = `https://openweathermap.org/img/wn/${code}@2x.png`;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default WeatherIcon;
