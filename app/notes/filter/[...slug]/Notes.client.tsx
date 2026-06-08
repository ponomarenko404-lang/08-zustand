"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { NoteTag } from "@/types/note";

type Props = {
  tag?: NoteTag;
  initialPage?: number;
};

export default function NotesClient({ tag, initialPage = 1 }: Props) {
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // MODAL
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length === 0 && <p>No notes found</p>}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    </div>
  );
}
