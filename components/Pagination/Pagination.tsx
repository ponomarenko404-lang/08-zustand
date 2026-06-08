"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< previous"
      pageRangeDisplayed={5}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
}
