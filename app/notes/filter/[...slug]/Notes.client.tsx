'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api';
import { keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/app/notes/filter/[...slug]/error';
import Loading from '@/app/loading';
import css from './NotesPage.module.css';

interface Props {
  tag?: string;
}

export default function NotesClient({ tag = '' }: Props) {
  const PER_PAGE = 12;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const params: FetchNotesParams = {
    search: debouncedSearch,
    page,
    perPage: PER_PAGE,
    sortBy: 'created',
    ...(tag ? { tag } : {}),
  };

  const { data, isLoading, isFetching, isError, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(params),
    refetchOnMount: false,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorMessage error={error} />;
  if (!data) return <Loading />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        {data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data.notes.length === 0 && !isFetching && <p>No notes found.</p>}

      {data.notes.length > 0 && (
        <NoteList notes={data.notes} isLoading={isLoading} isFetching={isFetching} />
      )}
    </div>
  );
}
