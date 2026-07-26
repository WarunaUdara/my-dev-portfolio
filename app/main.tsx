import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Route as rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as guestbookRoute } from './routes/guestbook';
import { Route as usesRoute } from './routes/uses';
import { Route as bucketListRoute } from './routes/bucket-list';
import { Route as linksRoute } from './routes/links';

const routeTree = rootRoute.addChildren([
  indexRoute,
  guestbookRoute,
  usesRoute,
  bucketListRoute,
  linksRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
