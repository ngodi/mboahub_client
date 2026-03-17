import ReactPaginate from 'react-paginate';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './Pagination.css';

function Pagination({ meta, onPageChange }) {
  return (
    <ReactPaginate
      pageCount={meta?.pageCount}
      forcePage={meta?.page - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      previousLabel='Prev'
      nextLabel='Next'
      breakLabel='...'
      containerClassName='pagination'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      activeClassName='active'
    />
  );
}
export default Pagination;
