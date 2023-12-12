import { useQuery } from "react-query";
import { queryKey } from "../../lib/apiUtils";
import {
	getAllCategoriesAJAX,
	getAllLocationsAJAX,
} from "../../services/api/requestApi";

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

	return {
		getAllCategories,
		getAllLocations,
		categories: getAllCategories.data,
		locations: getAllLocations.data,
	};
}
