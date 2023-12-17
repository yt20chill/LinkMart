import { useQuery } from "react-query";
import { RequestId } from "../../schemas/requestSchema";
import { AddressDto, RequestDetailsDto } from "../../schemas/responseSchema";
import {
	getAllCategoriesAJAX,
	getAllLocationsAJAX,
	getRequestDetailsAJAX,
} from "../../services/api/requestApi";
import { getAddressAJAX } from "../../services/api/userApi";
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
	const getAddresses = useQuery<AddressDto[]>({
		queryKey: [queryKey.USER, "address"],
		queryFn: getAddressAJAX,
	});
	return {
		getAllCategories,
		getAllLocations,
		getAddresses,
		categories: getAllCategories.data,
		locations: getAllLocations.data,
		addresses: getAddresses.data,
		useGetRequestDetails,
	};
}
