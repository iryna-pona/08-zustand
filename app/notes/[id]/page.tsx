import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import type { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  const title = note.title;
  const description = note.content ? note.content.slice(0, 100) : 'Note details';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${params.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

type NoteProps = {
    params: Promise<{id: string}>
}

export default async function NoteDetails({ params }: NoteProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}