import React from 'react';
import SVG from 'react-inlinesvg';

type IconProps = {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  color,
}) => {
  const iconPath = `/assets/icons/${name}.svg`;

  return (
    <SVG
      src={iconPath}
      className={className}
      width={size}
      height={size}
      preProcessor={(code) =>
        color ? code.replace(/fill=".*?"/g, `fill="${color}"`) : code
      }
      onError={(error) => {
        console.error(`Icon load error for "${name}":`, error);
      }}
    />
  );
};

export default Icon;
