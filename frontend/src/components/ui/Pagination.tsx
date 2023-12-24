import { MouseEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type PaginationProps = {
	page: number;
	totalPages: number;
	pageToShow?: number;
	onClick: (targetPage: number) => void;
};

const prevOrNextPageStyle =
	"inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900";
const activePageStyle =
	"block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white";
const inactivePageStyle =
	"block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900";
// TODO: To Fredy: style this however you want
const disabledStyle = "pointer-event-none";

const Pagination = ({
	page,
	totalPages,
	pageToShow = 5,
	onClick,
}: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(page);
	const toPrevPage = (e: MouseEvent) => {
		e.preventDefault();
		setCurrentPage((prev) => Math.max(1, --prev));
	};
	const toNextPage = (e: MouseEvent) => {
		e.preventDefault();
		setCurrentPage((prev) => Math.min(totalPages, ++prev));
	};

	useEffect(() => {
		onClick(currentPage);
	}, [currentPage, onClick]);

	return (
		<ol className="flex justify-center gap-1 text-xs font-medium">
			{/* to prev page */}
			<li>
				<div
					onClick={toPrevPage}
					className={
						currentPage === 1
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
			{/* Many pages && current pages > page to show => pagination with {...} */}
			{totalPages > pageToShow && currentPage <= pageToShow ? (
				<PaginationWithoutEllipsis
					pageToShow={pageToShow}
					currentPage={currentPage}
					onClick={setCurrentPage}
				/>
			) : (
				<PaginationWithEllipsis
					totalPages={totalPages}
					pageToShow={pageToShow}
					currentPage={currentPage}
					onClick={setCurrentPage}
				/>
			)}
			{/* to next page */}
			<li>
				<div
					onClick={toNextPage}
					className={
						currentPage === totalPages
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

type PagesProps = {
	pageToShow: number;
	currentPage: number;
	onClick: (targetPage: number) => void;
};

const PaginationWithoutEllipsis = ({
	pageToShow,
	currentPage,
	onClick,
}: PagesProps) => {
	return (
		<>
			{Array(pageToShow)
				.fill(null)
				.map((_, index) => (
					<li
						key={index}
						onClick={(e) => {
							e.preventDefault();
							onClick(index + 1);
						}}
						className={
							index + 1 === currentPage ? activePageStyle : inactivePageStyle
						}
					>
						{index + 1}
					</li>
				))}
		</>
	);
};

const PaginationWithEllipsis = ({
	totalPages,
	pageToShow,
	currentPage,
	onClick,
}: PagesProps & { totalPages: number }) => {
	return (
		<>
			<li
				className={currentPage === 1 ? activePageStyle : inactivePageStyle}
				onClick={(e) => {
					e.preventDefault();
					onClick(1);
				}}
			>
				1
			</li>
			<li className={twMerge(inactivePageStyle, disabledStyle)}>...</li>
			{Array(totalPages)
				.fill(null)
				.map((_, index) => {
					// skip first page, show only pages within range
					return index &&
						index >= currentPage - Math.floor(pageToShow / 2) &&
						index < currentPage + Math.floor(pageToShow / 2) ? (
						<li
							key={index}
							onClick={(e) => {
								e.preventDefault();
								onClick(index + 1);
							}}
							className={
								index + 1 === currentPage ? activePageStyle : inactivePageStyle
							}
						>
							{index + 1}
						</li>
					) : null;
				})}
		</>
	);
};
