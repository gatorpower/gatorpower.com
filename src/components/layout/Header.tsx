import type { ComponentPropsWithoutRef } from 'react';

type HeaderProps = ComponentPropsWithoutRef<'header'>;

export function Header({ children, ...rest }: HeaderProps) {
  return (
    <header {...rest}>
      <h1 className="sr-only">Gatorpower</h1>
      <nav>{/* logo, links */}</nav>
      {children}
    </header>
  );
}