import { createFileRoute } from '@tanstack/react-router';
import UsesPage from '../uses/page';

export const Route = createFileRoute('/uses')({
  component: UsesPage,
});
