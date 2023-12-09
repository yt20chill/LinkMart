import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { CategoriesResult, LocationsResult } from "../../types/fetchModels";
import {
	categoriesResponseSchema,
	locationsResponseSchema,
} from "./responseSchema";

export const getCategory = async () => {
	return (await axiosWrapper<void, CategoriesResult>(
		requestApiRoutes.CATEGORY,
		{
			schema: categoriesResponseSchema,
		}
	)) as unknown as CategoriesResult; // TODO: fix it after fixing the axiosWrapper function
};

export const getLocation = async () => {
	return (await axiosWrapper<void, LocationsResult>(requestApiRoutes.LOCATION, {
		schema: locationsResponseSchema,
	})) as unknown as LocationsResult; // TODO: fix it after fixing the axiosWrapper function
};

export const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, void>(requestApiRoutes.REQUEST, {
		method: "post",
		data: formData,
	});
};
