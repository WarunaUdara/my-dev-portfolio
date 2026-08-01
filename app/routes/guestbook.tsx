import { createFileRoute } from '@tanstack/react-router';
import GuestbookPage from '../guestbook/page';
import { AuthProvider } from '@/contexts/AuthContext';

export const Route = createFileRoute('/guestbook')({
  component: GuestbookRouteComponent,
});

function GuestbookRouteComponent() {
  return (
    <AuthProvider>
      <GuestbookPage />
    </AuthProvider>
  );
}
