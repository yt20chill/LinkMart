import { AuthDto, authResponseSchema } from "./authResponseSchema";
import { BaseResponseDto, baseResponseSchema } from "./baseResponseSchema";
import {
	CategoryDto,
	CategoryFieldDto,
	ImageDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
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
	CategoryDto,
	CategoryFieldDto,
	ImageDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
	UserDto,
};
