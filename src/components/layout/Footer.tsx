import type { ComponentPropsWithoutRef } from 'react';

type FooterProps = ComponentPropsWithoutRef<'footer'>;

export function Footer({ children, ...rest }: FooterProps) {
  return (
    <footer {...rest}>
      {children ?? <small>© {new Date().getFullYear()}</small>}
    </footer>
  );
}