import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	CreateOrderParams,
	TPostLogisticCompanyForm,
	TReviewOrderForm,
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
	USER_ORDER: "/api/user/order",
	LOGISTIC_COMPANY: "/logisticCompany",
	POST_LOGISTIC_COMPANY: "/api/logisticCompany",
});

export {
	addLogisticCompanyAJAX,
	createOrderAJAX,
	getLogisticCompanyAJAX,
	getUserOrdersAJAX,
	orderDetailsAJAX,
	reviewOrderAJAX,
	uploadShippingAJAX,
};

// Mock payment
const createOrderAJAX = async (params: CreateOrderParams) => {
	return await axiosWrapper<void, CreateOrderDto>(orderApiRoutes.ORDER, {
		schema: createOrderResponseSchema,
		params,
	});
};

const getUserOrdersAJAX = async (status: "inProgress" | "complete") => {
	return await axiosWrapper<void, GetOrderDto[]>(
		`${orderApiRoutes.USER_ORDER}/${status}`,
		{
			schema: getOrdersSchema,
		}
	);
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

const reviewOrderAJAX = async (orderId: string, form: TReviewOrderForm) => {
	return await axiosWrapper<TReviewOrderForm>(
		`${orderApiRoutes.ORDER}/${orderId}/review`,
		{
			method: "put",
			data: form,
		}
	);
};
