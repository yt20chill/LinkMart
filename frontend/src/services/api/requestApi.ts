import { FetchError, axiosWrapper } from "../../lib/apiUtils";
import { printFormData } from "../../lib/formUtils";
import { DeleteImageParams } from "../../schemas/requestSchema";
import {
	CategoryId,
	RequestId,
} from "../../schemas/requestSchema/requestSchema";

import {
	CategoryDto,
	CategoryFieldDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
} from "../../schemas/responseSchema";

const requestApiRoutes = Object.freeze({
	CATEGORY: `/category`,
	LOCATION: `/location`,
	REQUEST: `/request`,
	POST_REQUEST: `/api/request`,
	IMAGE: `/request/image`,
});

export const getAllCategoriesAJAX = async () => {
	return (
		(await axiosWrapper<void, CategoryDto[]>(requestApiRoutes.CATEGORY, {
			schema: categoriesResponseSchema,
		})) ?? []
	);
};

export const getCategoryFieldsAJAX = async ({ categoryId }: CategoryId) => {
	return (
		(await axiosWrapper<number, CategoryFieldDto[]>(
			`${requestApiRoutes.CATEGORY}/${categoryId}`,
			{ schema: categoryFieldsResponseSchema }
		)) ?? []
	);
};

export const getAllLocationsAJAX = async () => {
	return (
		(await axiosWrapper<void, LocationDto[]>(requestApiRoutes.LOCATION, {
			schema: locationsResponseSchema,
		})) ?? []
	);
};

export const postRequestAJAX = async (formData: FormData) => {
	printFormData(formData);
	return await axiosWrapper<FormData>(requestApiRoutes.POST_REQUEST, {
		method: "post",
		data: formData,
	});
};

/**
 * searchParams may contain page, location, and category
 * @param searchParams URLSearchParams
 * @returns brief info of requests
 */
export const getAllRequestsAJAX = async (searchParams: URLSearchParams) => {
	return (
		(await axiosWrapper<void, RequestDto[]>(requestApiRoutes.REQUEST, {
			schema: requestsResponseSchema,
			params: searchParams,
		})) ?? []
	);
};

export const getRequestDetailsAJAX = async ({ requestId }: RequestId) => {
	if (!requestId) throw new FetchError(400, "invalid request id");
	return (
		(await axiosWrapper<void, RequestDetailsDto>(
			`${requestApiRoutes.REQUEST}/${requestId}`,
			{ schema: requestDetailsResponseSchema }
		)) ?? {}
	);
};

export const putRequestAJAX = async (requestId: string, formData: FormData) => {
	return await axiosWrapper<FormData>(
		`${requestApiRoutes.POST_REQUEST}/${requestId}`,
		{
			method: "put",
			data: formData,
		}
	);
};

export const deleteRequestAJAX = async ({ requestId }: RequestId) => {
	return await axiosWrapper(`${requestApiRoutes.POST_REQUEST}/${requestId}`, {
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
