import { createFileRoute } from '@tanstack/react-router';
import LinksPage from '../links/page';

export const Route = createFileRoute('/links')({
  component: LinksPage,
});
