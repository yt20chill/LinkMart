import { RequestCard } from "@/components/card/RequestCard";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/ui/Pagination";
import { Filter } from "../../features/filter/Filter";
import { useSearchParamsWrapper } from "../../features/hooks/useSearchParamsWrapper";
import { getAllRequestsAJAX } from "../../services/api/requestApi";
import { SearchParamsWrapperContext } from "../../services/context/SearchParamsWrapperContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";

const RequestsPage = () => {
  const searchParamsWrapper = useSearchParamsWrapper(useSearchParams());
  const { searchParams, setSearchParams } = searchParamsWrapper;
  const { data } = useQuery({
    queryKey: [queryKey.REQUEST, { searchParams: searchParams.toString() }],
    queryFn: () => {
      return getAllRequestsAJAX(searchParams);
    },
  });

  const updatePage = (page: number) => {
    searchParams.set("p", page + "");
    setSearchParams(searchParams);
  };

  return (
    <SearchParamsWrapperContext.Provider value={searchParamsWrapper}>
      <div className="mt-5 max-w-7xl max-lg:px-2 mx-auto ">
        <h1 className="text-black text-xl"></h1>
        <div className="flex justify-start">
          <span className="whitespace-nowrap rounded-full bg-base-100 px-2.5 py-0.5 text-sm text-primary-400">
            Total Record: {data?.totalRecords ?? ""}
          </span>
        </div>
      </div>
      <div className="my-5 max-w-7xl flex mx-auto w-full">
        <Filter className="inline-flex flex-col max-lg:hidden pr-2 min-w-[200px] ml-2" />
        <div className="px-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-auto grow">
          {data ? (
            data.requests.map((request) => (
              <RequestCard key={request.requestId} {...request} />
            ))
          ) : (
            <>
              <RequestCardSkeleton />
              <RequestCardSkeleton />
              <RequestCardSkeleton />
              <RequestCardSkeleton />
            </>
          )}
        </div>
      </div>
      <Pagination
        page={searchParams.has("p") ? parseInt(searchParams.get("p")!) : 1}
        totalPages={data?.totalPages ?? 1}
        pageToShow={5}
        onClick={updatePage}
      />
      <Link
        to={siteMap(RouteEnum.PostRequest)}
        className="fixed text-base-100 bottom-0 right-0 mb-3 mr-3 md:mb-12 md:mr-12"
      >
        <div className="flex justify-center items-center bg-gradient-to-br from-primary-400 from-30% via-primary-200/50 to-secondary-300/50 bg-primary-400 hover:bg-secondary-500 p-4 gap-1 rounded-badge shadow-md backdrop-blur-xl ring-offset-0 hover:shadow-lg hover:-translate-y-1 hover:ring-primary-300 hover:ring-2 hover:ring-offset-2 transition-all duration-500 text-white">
          <span className="material-symbols-rounded">add_circle</span>
          <span className="max-md:hidden">Create Request</span>
        </div>
      </Link>
    </SearchParamsWrapperContext.Provider>
  );
};

export default RequestsPage;
