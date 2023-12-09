import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { GetRequestDetailsParams } from "../forms/requestSchema";

import {
	CategoriesDto,
	LocationsDto,
	RequestDetailsDto,
	RequestsDto,
	categoriesResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
} from "./responseSchema";

export const getCategory = async () => {
	return await axiosWrapper<void, CategoriesDto>(requestApiRoutes.CATEGORY, {
		schema: categoriesResponseSchema,
	});
};

export const getLocation = async () => {
	return await axiosWrapper<void, LocationsDto>(requestApiRoutes.LOCATION, {
		schema: locationsResponseSchema,
	});
};

export const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, void>(requestApiRoutes.REQUEST, {
		method: "post",
		data: formData,
	});
};

/**
 * searchParams may contain page, location, and category
 * @param searchParams useSearchParams.toString() to convert searchParams to string
 * @returns brief info of requests, limit = 30
 */
export const getAllRequestsAJAX = async (searchParams?: string) => {
	return await axiosWrapper<void, RequestsDto>(
		`${requestApiRoutes.REQUEST}?${searchParams ?? ""}`,
		{ schema: requestsResponseSchema }
	);
};

export const getRequestDetailsAJAX = async (
	params: GetRequestDetailsParams
) => {
	return await axiosWrapper<void, RequestDetailsDto>(
		`${requestApiRoutes.REQUEST}/${params.requestId}`,
		{ schema: requestDetailsResponseSchema }
	);
};
