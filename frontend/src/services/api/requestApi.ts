import { axiosWrapper } from "../../lib/apiUtils";
import { DeleteImageParams } from "../../schemas/requestSchema";
import {
	CategoryId,
	RequestId,
} from "../../schemas/requestSchema/requestSchema";

import {
	CategoryDto,
	CategoryFieldDto,
	LocationDto,
	PostRequestResponseDto,
	RequestDetailsDto,
	RequestsDto,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	postRequestResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
} from "../../schemas/responseSchema";

const requestApiRoutes = Object.freeze({
	CATEGORY: `/category`,
	LOCATION: `/location`,
	REQUEST: `/request`,
	POST_REQUEST: `/api/request`,
	IMAGE: `/api/request/image`,
	CLONE_REQUEST: `/api/request/clone`,
});

export {
	cloneRequestAJAX,
	deleteRequestAJAX,
	deleteRequestImageAJAX,
	getAllCategoriesAJAX,
	getAllLocationsAJAX,
	getAllRequestsAJAX,
	getCategoryFieldsAJAX,
	getRequestDetailsAJAX,
	postRequestAJAX,
	putRequestAJAX,
	setRequestPrimaryImageAJAX,
};

const getAllCategoriesAJAX = async () => {
	return (
		(await axiosWrapper<void, CategoryDto[]>(requestApiRoutes.CATEGORY, {
			schema: categoriesResponseSchema,
		})) ?? []
	);
};

const getCategoryFieldsAJAX = async ({ categoryId }: CategoryId) => {
	return (
		(await axiosWrapper<number, CategoryFieldDto[]>(
			`${requestApiRoutes.CATEGORY}/${categoryId}`,
			{ schema: categoryFieldsResponseSchema }
		)) ?? []
	);
};

const getAllLocationsAJAX = async () => {
	return (
		(await axiosWrapper<void, LocationDto[]>(requestApiRoutes.LOCATION, {
			schema: locationsResponseSchema,
		})) ?? []
	);
};

const postRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, PostRequestResponseDto>(
		requestApiRoutes.POST_REQUEST,
		{
			method: "post",
			data: formData,
			schema: postRequestResponseSchema,
		}
	);
};

const cloneRequestAJAX = async (formData: FormData) => {
	return await axiosWrapper<FormData, PostRequestResponseDto>(
		requestApiRoutes.CLONE_REQUEST,
		{
			method: "post",
			data: formData,
			schema: postRequestResponseSchema,
		}
	);
};

const putRequestAJAX = async (requestId: string, formData: FormData) => {
	return await axiosWrapper<FormData, PostRequestResponseDto>(
		`${requestApiRoutes.POST_REQUEST}/${requestId}`,
		{
			method: "put",
			data: formData,
			schema: postRequestResponseSchema,
		}
	);
};

/**
 * searchParams may contain page, location, and category
 * @param searchParams URLSearchParams
 * @returns brief info of requests
 */
const getAllRequestsAJAX = async (searchParams: URLSearchParams) => {
	return await axiosWrapper<void, RequestsDto>(requestApiRoutes.REQUEST, {
		schema: requestsResponseSchema,
		params: searchParams,
	});
};

const getRequestDetailsAJAX = async ({ requestId }: RequestId) => {
	return await axiosWrapper<void, RequestDetailsDto>(
		`${requestApiRoutes.REQUEST}/${requestId}`,
		{ schema: requestDetailsResponseSchema }
	);
};

const deleteRequestAJAX = async ({ requestId }: RequestId) => {
	return await axiosWrapper(`${requestApiRoutes.POST_REQUEST}/${requestId}`, {
		method: "delete",
	});
};

const deleteRequestImageAJAX = async ({ imageId }: DeleteImageParams) => {
	return await axiosWrapper(`${requestApiRoutes.IMAGE}/${imageId}`, {
		method: "delete",
	});
};

const setRequestPrimaryImageAJAX = async (imageId: number) => {
	return await axiosWrapper(`${requestApiRoutes.IMAGE}`, {
		method: "put",
		data: JSON.stringify({ imageId }),
	});
};
