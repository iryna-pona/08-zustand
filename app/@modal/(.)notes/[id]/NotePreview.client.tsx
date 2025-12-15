'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const close = () => router.back();

  if (!id) return null;

  if (isLoading)
    return <Modal onClose={close}>Loading, please wait...</Modal>;
  
  if (isError)
    return <Modal onClose={close}>Error: {error?.message}</Modal>;
  
  if (!note)
    return <Modal onClose={close}>Note not found</Modal>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>

          {note.tag && <span className={css.tag}>{note.tag}</span>}

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <button className={css.backBtn} onClick={close}>
            ← Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
