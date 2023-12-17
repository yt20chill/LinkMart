import { axiosWrapper } from "../../lib/apiUtils";
import { CreateOrderParams } from "../../schemas/requestSchema";
import {
	CreateOrderDto,
	createOrderResponseSchema,
} from "../../schemas/responseSchema";

const orderApiRoutes = Object.freeze({
	ORDER: "/api/order",
});

// Mock payment
const createOrderAJAX = async (params: CreateOrderParams) => {
	return await axiosWrapper<void, CreateOrderDto>(orderApiRoutes.ORDER, {
		schema: createOrderResponseSchema,
		params,
	});
};

export { createOrderAJAX };
