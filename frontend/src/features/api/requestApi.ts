import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { BaseFetchResult } from "../../types/fetchModels";

type CategoryResult = BaseFetchResult & {
	id: number;
	name: string;
};

type LocationResult = BaseFetchResult & {
	id: number;
	name: string;
};

export const getCategory = async () => {
	return await axiosWrapper<void, CategoryResult[]>(requestApiRoutes.CATEGORY);
};

export const getLocation = async () => {
	return await axiosWrapper<void, LocationResult[]>(requestApiRoutes.LOCATION);
};

export const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, void>(
		requestApiRoutes.REQUEST,
		"post",
		formData
	);
};
