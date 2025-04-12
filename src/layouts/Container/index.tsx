import cn from 'classnames';
import React, { forwardRef } from 'react';

import s from './style.module.scss';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container = forwardRef(
  ({ className, children }: ContainerProps, ref: React.Ref<HTMLElement>) => {
    return (
      <section ref={ref} className={cn(className, s.container)}>
        {children}
      </section>
    );
  },
);

Container.displayName = 'Container';

export default Container;
