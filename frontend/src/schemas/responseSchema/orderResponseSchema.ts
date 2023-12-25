import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export {
	createOrderResponseSchema,
	getLogisticsSchema,
	getOrdersSchema,
	orderDetailsSchema,
	postLogisticsSchema,
	postReportSchema,
};
export type {
	CreateOrderDto,
	GetOrderDto,
	LogisticsDto,
	OrderDetailsDto,
	PostLogisticDto,
	PostReportDto,
};

const createOrderResponseSchema = z.object({
	orderId: ulid,
});

type CreateOrderDto = z.infer<typeof createOrderResponseSchema>;

const getOrderResponseSchema = z.object({
	orderId: ulid,
	orderStatus: z.string().min(1),
	providerId: ulid,
	providerName: z.string().min(1),
	item: z.string().min(1),
	primaryImage: z.string().url(),
	quantity: z.string().min(1),
	price: z.number().positive(),
	estimatedProcessTime: z.number().positive().int(),
	createdAt: z.string().or(z.number().int().positive()),
});

const getOrdersSchema = z.array(getOrderResponseSchema);

type GetOrderDto = z.infer<typeof getOrderResponseSchema>;

const orderDetailsSchema = getOrderResponseSchema.extend({
	updatedAt: z.string().or(z.number().int().positive()),
	requestId: ulid,
	locationName: z.string().min(1),
	createdBy: z.string().min(1),
	images: z.array(z.string().url()),
	itemDetail: z.record(z.string().nullable()).nullable(),
	url: z.string().url().nullable(),
	requestRemark: z.string().nullable(),
	address: z.string().min(1),
	shippingOrderNo: z.string().min(1).nullable(),
	logisticCompanyName: z.string().min(1).nullable(),
	logisticCompanyUrl: z.string().url().nullable(),
});

type OrderDetailsDto = z.infer<typeof orderDetailsSchema>;

const logisticsSchema = z.object({
	logisticCompanyId: z.number().int().positive(),
	companyName: z.string().min(1),
	companyUrl: z.string().url(),
});

const getLogisticsSchema = z.array(logisticsSchema);
type LogisticsDto = z.infer<typeof logisticsSchema>;

const postLogisticsSchema = z.object({
	logisticCompanyId: z.number().int().positive(),
});

type PostLogisticDto = z.infer<typeof postLogisticsSchema>;

const postReportSchema = z.object({
	reportId: ulid,
});

type PostReportDto = z.infer<typeof postReportSchema>;
