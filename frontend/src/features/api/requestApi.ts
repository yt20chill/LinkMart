import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { DeleteImageParams, RequestIdParams } from "../forms/requestSchema";

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
	return await axiosWrapper<FormData>(requestApiRoutes.REQUEST, {
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

export const getRequestDetailsAJAX = async ({ requestId }: RequestIdParams) => {
	return await axiosWrapper<void, RequestDetailsDto>(
		`${requestApiRoutes.REQUEST}/${requestId}`,
		{ schema: requestDetailsResponseSchema }
	);
};

export const putRequestAJAX = async (
	{ requestId }: RequestIdParams,
	formData: FormData
) => {
	return await axiosWrapper<FormData>(
		`${requestApiRoutes.REQUEST}/${requestId}`,
		{
			method: "put",
			data: formData,
		}
	);
};

export const deleteRequestAJAX = async ({ requestId }: RequestIdParams) => {
	return await axiosWrapper(`${requestApiRoutes.REQUEST}/${requestId}`, {
		method: "delete",
	});
};

export const deleteRequestImageAJAX = async ({
	imageId,
}: DeleteImageParams) => {
	return await axiosWrapper(`${requestApiRoutes.IMAGE}/${imageId}`, {
		method: "delete",
	});
};
