import { useQuery } from "react-query";
import { RequestId } from "../../schemas/requestSchema";
import { RequestDetailsDto } from "../../schemas/responseSchema";
import {
	getAllCategoriesAJAX,
	getAllLocationsAJAX,
	getRequestDetailsAJAX,
} from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";

export function useQueryContainer() {
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
	const useGetRequestDetails = (requestId: RequestId) => {
		return useQuery<RequestDetailsDto | undefined>({
			queryKey: [queryKey.REQUEST, requestId],
			queryFn: () => getRequestDetailsAJAX(requestId),
		});
	};

	return {
		getAllCategories,
		getAllLocations,

		categories: getAllCategories.data,
		locations: getAllLocations.data,

		useGetRequestDetails,
	};
}
