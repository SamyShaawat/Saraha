import { useEffect } from 'react';
import type React from 'react';
import { inspectProps } from '../utils/inspect';

type InspectPageProps = {
  name: string;
  route: string;
  children: React.ReactNode;
};

export function InspectPage({ name, route, children }: InspectPageProps) {
  useEffect(() => {
    document.body.setAttribute('data-page', name);
    document.body.setAttribute('data-route', route);

    return () => {
      document.body.removeAttribute('data-page');
      document.body.removeAttribute('data-route');
    };
  }, [name, route]);

  return <div {...inspectProps('Page', { page: name, route })}>{children}</div>;
}
