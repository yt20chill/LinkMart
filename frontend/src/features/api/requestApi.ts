import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { CategoriesResult, LocationsResult } from "../../types/fetchModels";
import {
	categoriesResponseSchema,
	locationsResponseSchema,
} from "./responseSchema";

export const getCategory = async () => {
	return await axiosWrapper<void, CategoriesResult>(requestApiRoutes.CATEGORY, {
		schema: categoriesResponseSchema,
	});
};

export const getLocation = async () => {
	return await axiosWrapper<void, LocationsResult>(requestApiRoutes.LOCATION, {
		schema: locationsResponseSchema,
	});
};

export const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, void>(requestApiRoutes.REQUEST, {
		method: "post",
		data: formData,
	});
};
