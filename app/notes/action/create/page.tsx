import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Page for creating a new note',
  alternates: {
    canonical: '/notes/action/create',
  },
  openGraph: {
    title: 'Create note',
    description: 'Create a new note',
    url: '/notes/action/create',
    images: [
      {
        url: '/og-create-note.png',
        width: 1200,
        height: 630,
        alt: 'Create note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
