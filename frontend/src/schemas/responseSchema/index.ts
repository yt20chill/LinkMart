import { AuthDto, authResponseSchema } from "./authResponseSchema";
import { ErrorResponseDto, errorResponseSchema } from "./baseResponseSchema";
import {
	AcceptOfferResponseDto,
	OfferDetailsDto,
	acceptOfferResponseSchema,
	requestOffersResponseSchema,
} from "./offerResponseSchema";
import {
	CreateOrderDto,
	GetOrderDto,
	OrderDetailsDto,
	createOrderResponseSchema,
	getOrdersSchema,
	orderDetailsSchema,
} from "./orderResponseSchema";

import {
	CategoryDto,
	CategoryFieldDto,
	ImageDto,
	LocationDto,
	PostRequestResponseDto,
	RequestDetailsDto,
	RequestDto,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	postRequestResponseSchema,
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
	createOrderResponseSchema,
	errorResponseSchema,
	getOrdersSchema,
	locationsResponseSchema,
	orderDetailsSchema,
	postRequestResponseSchema,
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
	OfferDetailsDto,
	OrderDetailsDto,
	PostRequestResponseDto,
	RequestDetailsDto,
	RequestDto,
	UserDto,
};
