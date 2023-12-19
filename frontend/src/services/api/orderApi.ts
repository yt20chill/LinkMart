import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	CreateOrderParams,
	TPostLogisticCompanyForm,
	TUploadShippingForm,
} from "../../schemas/requestSchema";
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
} from "../../schemas/responseSchema";

const orderApiRoutes = Object.freeze({
	ORDER: "/api/order",
	ORDER_ACTIVE: "/api/user/order/inProgress",
	ORDER_HISTORY: "/api/user/order/complete",
	LOGISTIC_COMPANY: "/logisticCompany",
	POST_LOGISTIC_COMPANY: "/api/logisticCompany",
});

export {
	addLogisticCompanyAJAX,
	createOrderAJAX,
	getLogisticCompanyAJAX,
	getOrdersHistoryAJAX,
	getOrdersInProgressAJAX,
	orderDetailsAJAX,
	uploadShippingAJAX,
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

const getLogisticCompanyAJAX = async () => {
	return await axiosWrapper<void, LogisticsDto[]>(
		orderApiRoutes.LOGISTIC_COMPANY,
		{ schema: getLogisticsSchema }
	);
};

const addLogisticCompanyAJAX = async (form: TPostLogisticCompanyForm) => {
	return await axiosWrapper<TPostLogisticCompanyForm, PostLogisticDto>(
		orderApiRoutes.POST_LOGISTIC_COMPANY,
		{
			method: "post",
			data: form,
			schema: postLogisticsSchema,
		}
	);
};

const uploadShippingAJAX = async (
	orderId: string,
	form: TUploadShippingForm
) => {
	const data = appendFormData(form);
	return await axiosWrapper<FormData>(`${orderApiRoutes.ORDER}/${orderId}`, {
		method: "put",
		data,
	});
};
