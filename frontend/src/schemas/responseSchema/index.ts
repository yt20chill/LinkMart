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
import {
	AddressDto,
	UserDto,
	addressesResponseSchema,
	userResponseSchema,
} from "./userResponseSchema";

export {
	acceptOfferResponseSchema,
	addressesResponseSchema,
	authResponseSchema,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	errorResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
	userResponseSchema,
};

export type {
	AcceptOfferResponseDto,
	AddressDto,
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
