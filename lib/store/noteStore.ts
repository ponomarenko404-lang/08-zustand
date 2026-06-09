import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { NoteTag } from "@/types/note";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

interface NoteStore {
  draft: typeof initialDraft;

  setDraft: (draft: Partial<typeof initialDraft>) => void;

  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (draft) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...draft,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({
        draft: state.draft,
      }),
    },
  ),
);
