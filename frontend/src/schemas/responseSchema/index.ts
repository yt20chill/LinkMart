import { AuthDto, authResponseSchema } from "./authResponseSchema";
import { ErrorResponseDto, errorResponseSchema } from "./baseResponseSchema";
import {
	AcceptOfferResponseDto,
	acceptOfferResponseSchema,
} from "./orderResponseSchema";
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
	acceptOfferResponseSchema,
	authResponseSchema,
	errorResponseSchema as baseResponseSchema,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
	userResponseSchema,
};

export type {
	AcceptOfferResponseDto,
	AuthDto,
	CategoryDto,
	CategoryFieldDto,
	ErrorResponseDto,
	ImageDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
	UserDto,
};
