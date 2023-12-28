import { RequestCard } from "@/components/card/RequestCard";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ExpandButton from "../../components/button/ExpandButton";
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
  const [memoizedTotalPages, setMemoizedTotalPages] = useState(1);
  const [expandFilter, setExpandFilter] = useState(false);
  const { data } = useQuery({
    queryKey: [queryKey.REQUEST, { searchParams: searchParams.toString() }],
    queryFn: () => {
      return getAllRequestsAJAX(searchParams);
    },
  });
  useEffect(() => {
    if (!data) return;
    setMemoizedTotalPages(data.totalPages);
  }, [data]);

  const updatePage = (page: number) => {
    searchParams.set("p", page + "");
    setSearchParams(searchParams);
  };

<<<<<<< Updated upstream
  return (
    <SearchParamsWrapperContext.Provider value={searchParamsWrapper}>
      <div className="mt-5 max-w-7xl max-lg:px-2 mx-auto ">
        <h1 className="text-black text-xl"></h1>
        <div className="flex justify-start"></div>
      </div>
      <button
        className="fixed left-0 top-1/2 z-20 hidden max-lg:block bg-primary-400 hover:bg-primary-500 text-white font-bold p-2 rounded-r-full  shadow-md backdrop-blur-xl ring-offset-0 hover:shadow-lg hover:-translate-y-1 hover:ring-primary-300 hover:ring-2 hover:ring-offset-2 transition-all duration-500 h-28"
        onClick={(e) => {
          e.preventDefault();
          setExpandFilter(!expandFilter);
        }}
      >
        {expandFilter ? (
          <i className="bi bi-caret-left-fill"></i>
        ) : (
          <i className="bi bi-caret-right-fill"></i>
        )}
      </button>
      <div className="my-5 max-w-7xl flex mx-auto w-full relative">
        <Filter
          className={twMerge(
            "inline-flex flex-col pr-2 min-w-[200px] lg:ml-2 max-lg:w-screen max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-10 max-lg:bg-base-100/10 backdrop-blur-3xl max-lg:h-screen max-lg:overflow-y-auto max-lg:pt-[15%] max-lg:px-6",
            !expandFilter && "max-lg:hidden"
          )}
        />
        <div>
          <header className="rounded-lg px-6 mb-6">
            <span className="leading-none text-primary-400">Linkmart</span>
            <h1 className="text-3xl font-bold leading-none mb-2">Request</h1>
            <p className="text-base-content">
              You may explore what people are currently seeking or create a
              request to let others make you offers.
            </p>
          </header>
          {data && (
            <div className="indent-3 text-base-content/75 mb-2">
              {data.totalRecords ? (
                <>
                  <i className="bi bi-files me-2"></i>Records Found:
                  {` ${data.totalRecords}`}
                </>
              ) : (
                <>
                  <i className="bi bi-files me-2"></i>No Record
                </>
              )}
            </div>
          )}
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
          <Pagination
            page={searchParams.has("p") ? parseInt(searchParams.get("p")!) : 1}
            totalPages={memoizedTotalPages}
            pageToShow={5}
            onClick={updatePage}
          />
        </div>
      </div>
=======
	return (
		<SearchParamsWrapperContext.Provider value={searchParamsWrapper}>
			<div className="mt-5 max-w-7xl max-lg:px-2 mx-auto ">
				<h1 className="text-black text-xl"></h1>
				<div className="flex justify-start"></div>
			</div>
			<ExpandButton isExpanded={expandFilter} setIsExpanded={setExpandFilter} />
			<div className="my-5 max-w-7xl flex mx-auto w-full">
				<Filter
					className={twMerge(
						"inline-flex flex-col pr-2 min-w-[200px] ml-2",
						!expandFilter && "max-lg:hidden"
					)}
				/>
				<div>
					<header className="rounded-lg px-6 mb-6">
						<span className="leading-none text-primary-400">Linkmart</span>
						<h1 className="text-3xl font-bold leading-none mb-2">Request</h1>
						<p className="text-base-content">
							You may explore what people are currently seeking or create a
							request to let others make you offers.
						</p>
					</header>
					{data && (
						<div className="indent-3 text-base-content/75 mb-2">
							{data.totalRecords ? (
								<>
									<i className="bi bi-files me-2"></i>Records Found:
									{` ${data.totalRecords}`}
								</>
							) : (
								<>
									<i className="bi bi-files me-2"></i>No Record
								</>
							)}
						</div>
					)}
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
					<Pagination
						page={searchParams.has("p") ? parseInt(searchParams.get("p")!) : 1}
						totalPages={memoizedTotalPages}
						pageToShow={5}
						onClick={updatePage}
					/>
				</div>
			</div>
>>>>>>> Stashed changes

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
