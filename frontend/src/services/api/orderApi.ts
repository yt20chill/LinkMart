import { axiosWrapper } from "../../lib/apiUtils";
import { CreateOrderParams } from "../../schemas/requestSchema";
import {
	CreateOrderDto,
	GetOrderDto,
	OrderDetailsDto,
	createOrderResponseSchema,
	getOrdersSchema,
	orderDetailsSchema,
} from "../../schemas/responseSchema";

const orderApiRoutes = Object.freeze({
	ORDER: "/api/order",
	ORDER_ACTIVE: "/api/user/order/inProgress",
	ORDER_HISTORY: "/api/user/order/complete",
});

export {
	createOrderAJAX,
	getOrdersHistoryAJAX,
	getOrdersInProgressAJAX,
	orderDetailsAJAX,
};

// Mock payment
const createOrderAJAX = async (params: CreateOrderParams) => {
	return await axiosWrapper<void, CreateOrderDto>(orderApiRoutes.ORDER, {
		schema: createOrderResponseSchema,
		params,
	});
};

const getOrdersInProgressAJAX = async () => {
	return await axiosWrapper<void, GetOrderDto[]>(orderApiRoutes.ORDER_ACTIVE, {
		schema: getOrdersSchema,
	});
};

const getOrdersHistoryAJAX = async () => {
	return await axiosWrapper<void, GetOrderDto[]>(orderApiRoutes.ORDER_HISTORY, {
		schema: getOrdersSchema,
	});
};

const orderDetailsAJAX = async (orderId: string) => {
	return await axiosWrapper<void, OrderDetailsDto>(
		`${orderApiRoutes.ORDER}/${orderId}`,
		{
			schema: orderDetailsSchema,
		}
	);
};
