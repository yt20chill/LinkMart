import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type PaginationProps = {
  page: number;
  totalPages: number;
  pageToShow?: number;
  onClick: (targetPage: number) => void;
};

const prevOrNextPageStyle =
  "inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-900";
const activePageStyle =
  "block h-8 w-8 rounded border-blue-600 bg-primary-400 text-center leading-8 text-white";
const inactivePageStyle =
  "block h-8 w-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900";
const disabledStyle = "pointer-event-none select-none";

const Pagination = ({
  page,
  totalPages,
  pageToShow = 5,
  onClick: setPage,
}: PaginationProps) => {
  const toPrevPage = (e: MouseEvent) => {
    e.preventDefault();
    if (page === 1) return;
    setPage(Math.max(1, --page));
  };
  const toNextPage = (e: MouseEvent) => {
    e.preventDefault();
    if (page === totalPages) return;
    setPage(Math.min(totalPages, ++page));
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium my-4">
      {/* to prev page */}
      <li>
        <div
          onClick={toPrevPage}
          className={
            page === 1
              ? twMerge(prevOrNextPageStyle, disabledStyle)
              : prevOrNextPageStyle
          }
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </li>

      <li
        className={page === 1 ? activePageStyle : inactivePageStyle}
        onClick={(e) => {
          e.preventDefault();
          setPage(1);
        }}
      >
        1
      </li>
      {page > Math.floor(pageToShow - 1) / 2 && (
        <li className={twMerge(inactivePageStyle, disabledStyle)}>...</li>
      )}
      {Array(totalPages)
        .fill(null)
        .map((_, index) => {
          // skip first page, show only pages within range
          return index &&
            // odd pages => in middle, even pages => middle - 1
            index + 1 >= page - Math.floor((pageToShow - 1) / 2) &&
            index + 1 <= page + Math.ceil((pageToShow - 1) / 2) ? (
            <li
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setPage(index + 1);
              }}
              className={
                index + 1 === page ? activePageStyle : inactivePageStyle
              }
            >
              {index + 1}
            </li>
          ) : null;
        })}
      {/* Last page was not print out, print ... */}
      {page + Math.ceil((pageToShow - 1) / 2) < totalPages && (
        <li className={twMerge(inactivePageStyle, disabledStyle)}>...</li>
      )}

      {/* to next page */}
      <li>
        <div
          onClick={toNextPage}
          className={
            page === totalPages
              ? twMerge(prevOrNextPageStyle, disabledStyle)
              : prevOrNextPageStyle
          }
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ol>
  );
};

export default Pagination;
