import { RequestCard } from "@/components/card/RequestCard";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { RequestDto } from "@/schemas/responseSchema";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Filter } from "../../features/filter/Filter";
import { useSearchParamsWrapper } from "../../features/hooks/useSearchParamsWrapper";
import { getAllRequestsAJAX } from "../../services/api/requestApi";
import { SearchParamsWrapperContext } from "../../services/context/searchParamsContext";
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
      <Filter />
      <div className="mt-5 max-w-7xl max-xl:px-2 mx-auto ">
        <h1 className="text-black text-xl "></h1>
      </div>
      <div className="mt-5 max-w-7xl max-xl:px-2 mx-auto grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {requests ? (
          requests.pages.map((data) =>
            data.map((item) => <RequestCard key={item.requestId} {...item} />)
          )
        ) : (
          <RequestCardSkeleton />
        )}
      </div>
      <Link
        to={siteMap(RouteEnum.PostRequest)}
        className="fixed text-base-100 bottom-0 right-0 mb-3 mr-3 md:mb-12 md:mr-12"
      >
        <div className="flex justify-center items-center bg-gradient-to-r from-amber-300 to-orange-500 p-4 gap-1 rounded-badge shadow">
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
