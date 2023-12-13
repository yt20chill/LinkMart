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

const fakeRequestList: RequestDto[] = [
	{
		requestId: "1",
		locationId: 1,
		locationName: "Japan",
		item: "1/48 RX-78F00 GUNDAM Full Gear with Extra Paint",
		image: "https://otsukai.com/public/item/69644/original-60ff12d0461f9.jpeg",
		offerPrice: 500,
		createdBy: "Fredy",
		updatedAt: "2022-12-10 12:00",
	},
	{
		requestId: "2",
		locationId: 2,
		locationName: "Japan",
		item: "Sakura Figure",
		image:
			"https://lojabuscanimes.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/a/sakura-01.jpg",
		offerPrice: null,
		createdBy: "Mad",
		updatedAt: "2023-11-10 12:10",
	},
	{
		requestId: "3",
		locationId: 1,
		locationName: "Japan",
		item: "真天魔限量版透明公仔",
		image:
			"https://media.karousell.com/media/photos/products/2016/05/30/online_1464614698_bb2c47e1.jpg",
		offerPrice: 250,
		createdBy: "阿莫",
		updatedAt: "2023-12-09 12:20",
	},
	{
		requestId: "4",
		locationId: 1,
		locationName: "Korea",
		item: "Beer",
		image:
			"https://static.wixstatic.com/media/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg/v1/fill/w_296,h_222,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg",
		offerPrice: 500,
		createdBy: "Kevin",
		updatedAt: "2023-12-04 12:00",
	},
	{
		requestId: "5",
		locationId: 2,
		locationName: "Korea",
		item: "MLB FUR Jacket NY YANKEES",
		image:
			"https://img.cdn.91app.hk/webapi/imagesV3/Original/SalePage/358471/0/638350418176770000?v=1",
		offerPrice: null,
		createdBy: "Mary",
		updatedAt: "2023-12-10 23:10",
	},
	{
		requestId: "6",
		locationId: 1,
		locationName: "Japan",
		item: "ROG明日香電競主機",
		image:
			"https://www.price.com.hk/space/product/nsp/images/20231005/044782eb9e34c68173ac.jpg",
		offerPrice: 25000,
		createdBy: "JasonLi",
		updatedAt: "2023-12-11 3:59",
	},
];

function RequestsPage() {
	const limit = 15;
	const searchParamsWrapper = useSearchParamsWrapper(useSearchParams());
	const { searchParams } = searchParamsWrapper;
	const { data: requests, isFetchingNextPage } = useInfiniteQuery<RequestDto[]>(
		{
			queryKey: [queryKey.REQUEST, { searchParams: searchParams.toString() }],
			queryFn: ({ pageParam = 1 }) => {
				searchParams.set("p", (pageParam as number).toString());
				searchParams.set("limit", limit.toString());
				return getAllRequestsAJAX(searchParams);
			},
			getNextPageParam: (lastPage, allPages): number | undefined => {
				return lastPage.length === limit ? allPages.length + 1 : undefined;
			},
		}
	);

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
