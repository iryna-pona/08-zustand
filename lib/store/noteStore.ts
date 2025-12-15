import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);

export { initialDraft };

