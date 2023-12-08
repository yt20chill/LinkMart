import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { BaseFetchResult } from "../../types/fetchModels";
import { RequestDto } from "../../types/requestModels";

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

export const postRequestAJAX = async (formData: RequestDto) => {
	return await axiosWrapper<RequestDto, void>(
		requestApiRoutes.REQUEST,
		"post",
		formData
	);
};
