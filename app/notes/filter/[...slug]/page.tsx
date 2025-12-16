import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams } from '@/lib/api';
import type { Metadata } from 'next';

type Props = {
  params: {
    slug?: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filter = params.slug?.join(' / ') ?? 'all';

  const title = `Notes filter: ${filter} | NoteHub`;
  const description = `Notes filtered by ${filter} in NoteHub`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/filter/${params.slug?.join('/') ?? ''}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filter ${filter}`,
        },
      ],
    },
  };
}

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
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
