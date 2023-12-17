import { AuthDto, authResponseSchema } from "./authResponseSchema";
import { ErrorResponseDto, errorResponseSchema } from "./baseResponseSchema";
import {
	AcceptOfferResponseDto,
	RequestOfferDto,
	acceptOfferResponseSchema,
	requestOffersResponseSchema,
} from "./offerResponseSchema";
import {
	CreateOrderDto,
	createOrderResponseSchema,
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
	GetOrderDto,
	UserDto,
	addressesResponseSchema,
	getOrdersSchema,
	userResponseSchema,
} from "./userResponseSchema";

export {
	acceptOfferResponseSchema,
	addressesResponseSchema,
	authResponseSchema,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	createOrderResponseSchema,
	errorResponseSchema,
	getOrdersSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestOffersResponseSchema,
	requestsResponseSchema,
	userResponseSchema,
};

export type {
	AcceptOfferResponseDto,
	AddressDto,
	AuthDto,
	CategoryDto,
	CategoryFieldDto,
	CreateOrderDto,
	ErrorResponseDto,
	GetOrderDto,
	ImageDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
	RequestOfferDto,
	UserDto,
};
