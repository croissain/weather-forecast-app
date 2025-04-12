'use client';

import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './style.module.scss';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'label'
  | 'body'
  | 'caption'
  | 'description'
  | 'button';
type TypographyColor = 'accent' | 'primary' | 'secondary' | 'error';

type TypographyWeight = 400 | 500 | 600;

export interface TypographyProps extends React.HTMLProps<HTMLOrSVGElement> {
  color?: TypographyColor;
  variant?: TypographyVariant;
  tag?: React.ElementType;
  weight?: TypographyWeight;
  target?: string;
  href?: string;
}

export const Typography = forwardRef((props: TypographyProps, ref: unknown) => {
  const {
    color = 'primary',
    variant = 'caption',
    tag: Tag = 'p',
    weight = 400,
    className,
    children,
    ...restProps
  } = props;

  return (
    <Tag
      style={{ fontWeight: weight }}
      ref={ref}
      className={cn(
        styles.typography,
        color ? styles[color] : null,
        styles[variant],
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  );
});

Typography.displayName = 'Typography';
