import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

export const AppLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased">
        <header className="container mx-auto p-4 border-b">
          <h1 className="text-2xl font-bold">Catálogo de Carros</h1>
        </header>
        <main className="container mx-auto p-4">
          <Outlet />
        </main>
        <footer className="container mx-auto p-4 border-t mt-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Catálogo de Carros. All rights reserved.
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};
