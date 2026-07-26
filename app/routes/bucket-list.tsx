import { createFileRoute } from '@tanstack/react-router';
import BucketListPage from '../bucket-list/page';

export const Route = createFileRoute('/bucket-list')({
  component: BucketListPage,
});
