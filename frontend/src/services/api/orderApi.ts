import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	CreateOrderParams,
	TPostLogisticCompanyForm,
	TReportForm,
	TReviewOrderForm,
	TUploadShippingForm,
} from "../../schemas/requestSchema";
import {
	CreateOrderDto,
	GetOrderDto,
	LogisticsDto,
	OrderDetailsDto,
	PostLogisticDto,
	PostReportDto,
	createOrderResponseSchema,
	getLogisticsSchema,
	getOrdersSchema,
	orderDetailsSchema,
	postLogisticsSchema,
	postReportSchema,
} from "../../schemas/responseSchema";

const orderApiRoutes = Object.freeze({
	ORDER: "/api/order",
	USER_ORDER: "/api/user/order",
	PROVIDER_TASK: "/api/provider/order",
	LOGISTIC_COMPANY: "/logisticCompany",
	POST_LOGISTIC_COMPANY: "/api/logisticCompany",
	REPORT: "/api/order/report",
});

export {
	addLogisticCompanyAJAX,
	confirmReceivedAJAX,
	createOrderAJAX,
	getLogisticCompanyAJAX,
	getProviderTasksAJAX,
	getUserOrdersAJAX,
	orderDetailsAJAX,
	postReportAJAX,
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

const getProviderTasksAJAX = async (status: "inProgress" | "complete") => {
	return await axiosWrapper<void, GetOrderDto[]>(
		`${orderApiRoutes.PROVIDER_TASK}/${status}`,
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

const confirmReceivedAJAX = async (orderId: string) => {
	return await axiosWrapper<void>(
		`${orderApiRoutes.ORDER}/${orderId}/received`,
		{
			method: "put",
		}
	);
};

const reviewOrderAJAX = async (orderId: string, form: TReviewOrderForm) => {
	return await axiosWrapper<TReviewOrderForm>(
		`${orderApiRoutes.ORDER}/${orderId}/review`,
		{
			method: "post",
			data: form,
		}
	);
};

const postReportAJAX = async (orderId: string, form: TReportForm) => {
	return await axiosWrapper<TReportForm, PostReportDto>(
		`${orderApiRoutes.REPORT}/${orderId}`,
		{
			method: "post",
			data: form,
			schema: postReportSchema,
		}
	);
};
