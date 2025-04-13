import cn from 'classnames';
import React from 'react';

import s from './style.module.scss';

type FlexProps = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrapReverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  as?: React.ElementType;
};

const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = 'nowrap',
  gap = 'md',
  className,
  onClick,
  as: Component = 'div',
}) => {
  const classes = cn(
    s.flex,
    s[`align${align}`],
    s[`justify${justify}`],
    s[`direction${direction}`],
    s[`wrap${wrap}`],
    s[`gap${gap}`],
    className,
  );

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Flex;
