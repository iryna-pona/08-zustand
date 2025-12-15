import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewModal(props: PreviewProps) {
  const { id } = await props.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}

