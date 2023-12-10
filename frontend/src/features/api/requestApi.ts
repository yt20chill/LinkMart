import { axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { printFormData } from "../../lib/formUtils";
import { DeleteImageParams, RequestIdParams } from "../forms/requestSchema";

import {
	CategoryDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
	categoriesResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
} from "./responseSchema";

export const getCategory = async () => {
	return await axiosWrapper<void, CategoryDto[]>(requestApiRoutes.CATEGORY, {
		schema: categoriesResponseSchema,
	});
};

export const getLocation = async () => {
	return await axiosWrapper<void, LocationDto[]>(requestApiRoutes.LOCATION, {
		schema: locationsResponseSchema,
	});
};

export const postRequestAJAX = async (formData: FormData) => {
	printFormData(formData);
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
	return await axiosWrapper<void, RequestDto[]>(
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

export const putRequestAJAX = async (requestId: string, formData: FormData) => {
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
