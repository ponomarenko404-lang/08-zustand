"use client";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={
                deleteMutation.isPending && deleteMutation.variables === note.id
              }
            >
              {deleteMutation.isPending && deleteMutation.variables === note.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
