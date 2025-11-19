import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';

// Lazy load pages
const WelcomePage = lazy(() =>
  import('@/pages/Welcome').then((module) => ({ default: module.WelcomePage }))
);

// A generic loading component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div>Loading...</div>
  </div>
);

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <WelcomePage />
          </Suspense>
        ),
      },
      // Feature routes will be added here
      // e.g., { path: '/cars', element: <CarsListPage /> }
    ],
  },
  {
    path: '*', // Fallback route for 404
    element: <div>Page Not Found</div>,
  },
]);
