import type { ComponentPropsWithoutRef } from 'react';

type MainProps = ComponentPropsWithoutRef<'main'>;

export function Main({ children, ...rest }: MainProps) {
  return <main {...rest}>{children}</main>;
}