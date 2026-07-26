import { createFileRoute } from '@tanstack/react-router';
import GuestbookPage from '../guestbook/page';

export const Route = createFileRoute('/guestbook')({
  component: GuestbookPage,
});
