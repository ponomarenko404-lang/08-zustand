"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { NoteTag } from "@/types/note";
import Link from "next/link";

type Props = {
  tag?: NoteTag;
  initialPage?: number;
};

export default function NotesClient({ tag, initialPage = 1 }: Props) {
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, query, tag ?? null],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag: tag,
        search: query,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  // SEARCH
  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    handleSearch(value);
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleInputChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length === 0 && <p>No notes found</p>}
    </div>
  );
}
