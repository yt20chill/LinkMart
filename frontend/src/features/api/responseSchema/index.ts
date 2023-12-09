import { AuthDto, authResponseSchema } from "./authResponseSchema";
import { BaseResponseDto, baseResponseSchema } from "./baseResponseSchema";
import {
	CategoriesDto,
	CategoryFieldsDto,
	LocationsDto,
	RequestDetailsDto,
	RequestsDto,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
} from "./requestResponseSchema";
import { UserDto, userResponseSchema } from "./userResponseSchema";

export {
	authResponseSchema,
	baseResponseSchema,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
	userResponseSchema,
};

export type {
	AuthDto,
	BaseResponseDto,
	CategoriesDto,
	CategoryFieldsDto,
	LocationsDto,
	RequestDetailsDto,
	RequestsDto,
	UserDto,
};
