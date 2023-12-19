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
	LogisticsDto,
	OrderDetailsDto,
	PostLogisticDto,
	createOrderResponseSchema,
	getLogisticsSchema,
	getOrdersSchema,
	orderDetailsSchema,
	postLogisticsSchema,
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
	getLogisticsSchema,
	getOrdersSchema,
	locationsResponseSchema,
	orderDetailsSchema,
	postLogisticsSchema,
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
	LogisticsDto,
	OfferDetailsDto,
	OrderDetailsDto,
	PostLogisticDto,
	PostRequestResponseDto,
	RequestDetailsDto,
	RequestDto,
	UserDto,
};
