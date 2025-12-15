import Link from 'next/link';
import Loading from '@/app/loading';
import type { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  isFetching: boolean;
}

export default function NoteList({ notes, isLoading, isFetching }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (isLoading) return <Loading />;
  if (!notes.length) return <p>No notes found.</p>;

  return (
    <>
      {isFetching && <div className={css.fetchingOverlay}>Loading…</div>}

      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.view}>
                View details
              </Link>
              <button className={css.button} onClick={() => mutation.mutate(note.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
