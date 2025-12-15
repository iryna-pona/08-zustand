import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage(props: PageProps) {
  const { slug } = await props.params;

  const queryClient = new QueryClient();

  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const fetchParams: FetchNotesParams = {
    search: '',
    page: 1,
    perPage: 12,
    sortBy: 'created',
    ...(tag ? { tag } : {}),
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', fetchParams.search, fetchParams.page, tag],
    queryFn: () => fetchNotes(fetchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={fetchParams.page ?? 1}
        initialSearch={fetchParams.search ?? ''}
        perPage={fetchParams.perPage ?? 12}
        initialTag={tag}
      />
    </HydrationBoundary>
  );
}
