import type React from 'react';
import Navbar from './Navbar';
import { inspectProps } from '../features/shared/utils/inspect';

type PageShellProps = {
  pageName: string;
  contentName?: string;
  centered?: boolean;
  maxWidth?: string;
  children: React.ReactNode;
};

export function PageShell({
  pageName,
  contentName,
  centered = false,
  maxWidth = '1200px',
  children,
}: PageShellProps) {
  return (
    <div {...inspectProps(pageName)}>
      <Navbar />
      <main
        {...inspectProps(contentName ?? `${pageName}.Container`)}
        className={`page-shell ${centered ? 'page-shell--centered' : ''}`}
      >
        <div className="page-shell__content" style={{ maxWidth }}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageShell;
