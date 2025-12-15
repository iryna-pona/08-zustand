import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
  currentPage: number;
}

export default function Pagination({ pageCount, onPageChange, currentPage }: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={data => onPageChange(data.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={currentPage - 1}
    />
  );
}
