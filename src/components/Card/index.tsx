import cn from 'classnames';
import React from 'react';

import s from './style.module.scss';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={cn(s.card, className)}>{children}</div>;
};

export default Card;
