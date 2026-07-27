import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { HelmetProvider } from 'react-helmet-async';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = (rootElement as any)._reactRoot || ReactDOM.createRoot(rootElement);
  (rootElement as any)._reactRoot = root;

  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </React.StrictMode>
  );
}
