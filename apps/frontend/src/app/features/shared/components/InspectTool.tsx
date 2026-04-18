import { useEffect, useMemo, useState } from 'react';

type InspectState = {
  page: string;
  route: string;
  component: string;
};

export function InspectTool() {
  const enabled = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const persisted = localStorage.getItem('inspect-tool');
    if (persisted === null) {
      localStorage.setItem('inspect-tool', '1');
      return true;
    }
    return window.location.search.includes('inspect=1') || persisted === '1';
  }, []);

  const [state, setState] = useState<InspectState>({
    page: '',
    route: '',
    component: '',
  });

  useEffect(() => {
    if (!enabled) return;

    const updateFromBody = () => {
      setState((prev) => ({
        ...prev,
        page: document.body.getAttribute('data-page') ?? '',
        route: document.body.getAttribute('data-route') ?? '',
      }));
    };

    updateFromBody();

    const observer = new MutationObserver(updateFromBody);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-page', 'data-route'] });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const component = target?.closest('[data-component]')?.getAttribute('data-component') ?? '';
      setState((prev) => ({ ...prev, component }));
    };

    document.addEventListener('click', onClick, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      style={{
        position: 'fixed',
        right: '0.75rem',
        bottom: '0.75rem',
        zIndex: 9999,
        minWidth: '240px',
        maxWidth: '80vw',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(148, 163, 184, 0.35)',
        borderRadius: '12px',
        color: '#f8fafc',
        padding: '0.75rem',
        fontSize: '12px',
        lineHeight: 1.5,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
        <div style={{ fontWeight: 700 }}>Inspect Tool</div>
        <button
          type="button"
          className="d-btn d-btn-xs d-btn-outline"
          onClick={() => {
            localStorage.setItem('inspect-tool', '0');
            window.location.reload();
          }}
        >
          Hide
        </button>
      </div>
      <div>
        <strong>Page:</strong> {state.page || '-'}
      </div>
      <div>
        <strong>Route:</strong> {state.route || '-'}
      </div>
      <div>
        <strong>Component:</strong> {state.component || '-'}
      </div>
    </aside>
  );
}

export default InspectTool;
