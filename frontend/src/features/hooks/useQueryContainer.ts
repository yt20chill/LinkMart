import { useQuery } from "react-query";
import { queryKey } from "../../lib/apiUtils";
import { getAllCategoriesAJAX, getAllLocationsAJAX } from "../api/requestApi";

export function useQueryContainer() {
	const getAllCategories = useQuery({
		queryKey: [queryKey.REQUEST, "categories"],
		queryFn: getAllCategoriesAJAX,
		cacheTime: Infinity,
	});
	const getAllLocations = useQuery({
		queryKey: [queryKey.REQUEST, "locations"],
		queryFn: getAllLocationsAJAX,
		cacheTime: Infinity,
	});

	return { getAllCategories, getAllLocations };
}
