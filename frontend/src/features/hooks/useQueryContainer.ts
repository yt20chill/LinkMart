import { useQuery } from "react-query";
import { RequestId } from "../../schemas/requestSchema";
import { RequestDetailsDto } from "../../schemas/responseSchema";
import {
	getAllCategoriesAJAX,
	getAllLocationsAJAX,
	getAllRequestsAJAX,
	getRequestDetailsAJAX,
} from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";

type UseGetRecommendationsParams = {
	location?: string;
	category?: string;
	limit?: number;
};

export { useGetRecommendations, useGetRequestDetails, useQueryContainer };

const useQueryContainer = () => {
	const getAllCategories = useQuery({
		queryKey: [queryKey.REQUEST, "categories"],
		queryFn: getAllCategoriesAJAX,
		// staleTime tells you how fresh you data is. infinity means it will never refetch
		staleTime: Infinity,
	});
	const getAllLocations = useQuery({
		queryKey: [queryKey.REQUEST, "locations"],
		queryFn: getAllLocationsAJAX,
		staleTime: Infinity,
	});

	return {
		getAllCategories,
		getAllLocations,
		categories: getAllCategories.data,
		locations: getAllLocations.data,
	};
};

const useGetRequestDetails = (requestId: RequestId) => {
	return useQuery<RequestDetailsDto | undefined>({
		queryKey: [queryKey.REQUEST, requestId],
		queryFn: () => getRequestDetailsAJAX(requestId),
	});
};

const useGetRecommendations = ({
	location,
	category,
	limit = 5,
}: UseGetRecommendationsParams) => {
	const searchParams = new URLSearchParams({ limit: limit.toString() });
	if (location) searchParams.append("location", location);
	if (category) searchParams.append("category", category);
	const getRecommendations = useQuery({
		queryKey: [
			queryKey.REQUEST,
			"recommendations",
			{ searchParams: searchParams.toString() },
		],
		queryFn: () => getAllRequestsAJAX(searchParams),
		enabled: !!location || !!category,
	});
	return {
		getRecommendations,
		recommendations: getRecommendations.data?.requests,
		searchParams,
	};
};
