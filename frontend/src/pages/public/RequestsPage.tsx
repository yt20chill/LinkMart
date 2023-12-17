import { RequestCard } from "@/components/card/RequestCard";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Filter } from "../../features/filter/Filter";
import { useSearchParamsWrapper } from "../../features/hooks/useSearchParamsWrapper";
import { getAllRequestsAJAX } from "../../services/api/requestApi";
import { SearchParamsWrapperContext } from "../../services/context/SearchParamsWrapperContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";

function RequestsPage() {
	const searchParamsWrapper = useSearchParamsWrapper(useSearchParams());
	const { searchParams } = searchParamsWrapper;
	const { data: requests, isFetchingNextPage } = useInfiniteQuery({
		queryKey: [queryKey.REQUEST, { searchParams: searchParams.toString() }],
		queryFn: ({ pageParam = 1 }) => {
			searchParams.set("p", (pageParam as number).toString());
			return getAllRequestsAJAX(searchParams);
		},
		getNextPageParam: (lastPage, allPages): number | undefined => {
			return lastPage && lastPage.length === 0
				? allPages.length + 1
				: undefined;
		},
	});

	return (
		<SearchParamsWrapperContext.Provider value={searchParamsWrapper}>
			<div className="mt-5 max-w-7xl max-lg:px-2 mx-auto ">
				<h1 className="text-black text-xl "></h1>
			</div>
			<div className="mt-5 max-w-7xl flex mx-auto">
				<Filter className="inline-flex flex-col min-w-[250px] max-lg:hidden" />
				<div className="px-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grow mb-auto w-screen">
					{requests && requests.pages.length > 0 ? (
						requests.pages.map((data) => {
							if (!data) return null;
							return data.map((item) => (
								<RequestCard key={item.requestId} {...item} />
							));
						})
					) : (
						<>
							<RequestCardSkeleton />
							<RequestCardSkeleton />
							<RequestCardSkeleton />
							<RequestCardSkeleton />
						</>
					)}
					{isFetchingNextPage && (
						<>
							<RequestCardSkeleton />
							<RequestCardSkeleton />
							<RequestCardSkeleton />
							<RequestCardSkeleton />
						</>
					)}
				</div>
			</div>

			<Link
				to={siteMap(RouteEnum.PostRequest)}
				className="fixed text-base-100 bottom-0 right-0 mb-3 mr-3 md:mb-12 md:mr-12"
			>
				<div className="flex justify-center items-center bg-gradient-to-br from-primary-400 from-30% via-primary-200/50 to-secondary-300/50 bg-primary-400 hover:bg-secondary-500 p-4 gap-1 rounded-badge shadow backdrop-blur-xl ring-offset-0 hover:shadow-lg hover:-translate-y-1 hover:ring-primary-300 hover:ring-2 hover:ring-offset-2 transition-all">
					<span className="material-symbols-rounded">add_circle</span>
					<span className="max-md:hidden">Create Request</span>
				</div>
			</Link>
			{isFetchingNextPage && (
				<span className="loading loading-dots loading-lg"></span>
			)}
		</SearchParamsWrapperContext.Provider>
	);
}

export default RequestsPage;
