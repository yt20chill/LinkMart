import { FetchError, axiosWrapper, requestApiRoutes } from "../../lib/apiUtils";
import { printFormData } from "../../lib/formUtils";
import { DeleteImageParams } from "../forms/requestSchema";
import { CategoryId, RequestId } from "../forms/requestSchema/requestSchema";

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
} from "./responseSchema";

export const getAllCategoriesAJAX = async () => {
	return await axiosWrapper<void, CategoryDto[]>(requestApiRoutes.CATEGORY, {
		schema: categoriesResponseSchema,
	});
};

export const getCategoryFieldsAJAX = async ({ categoryId }: CategoryId) => {
	return await axiosWrapper<number, CategoryFieldDto[]>(
		`${requestApiRoutes.CATEGORY}/${categoryId}`,
		{ schema: categoryFieldsResponseSchema }
	);
};

export const getAllLocationsAJAX = async () => {
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

export const getRequestDetailsAJAX = async ({ requestId }: RequestId) => {
	if (!requestId) throw new FetchError(400, "invalid request id");
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

export const deleteRequestAJAX = async ({ requestId }: RequestId) => {
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
