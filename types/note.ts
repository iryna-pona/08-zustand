export const TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export type NoteTag = (typeof TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}