import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { CategoriesResult, LocationsResult } from "../../types/fetchModels";

export const getCategory = async () => {
	return await axiosWrapper<void, CategoriesResult>(requestApiRoutes.CATEGORY);
};

export const getLocation = async () => {
	return await axiosWrapper<void, LocationsResult>(requestApiRoutes.LOCATION);
};

export const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, void>(
		requestApiRoutes.REQUEST,
		"post",
		formData
	);
};
