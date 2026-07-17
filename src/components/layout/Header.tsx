import type { ComponentPropsWithoutRef } from 'react';

type HeaderProps = ComponentPropsWithoutRef<'header'>;

export function Header({ children, ...rest }: HeaderProps) {
  return (
    <header {...rest}>
      <nav>{/* logo, links */}</nav>
      {children}
    </header>
  );
}