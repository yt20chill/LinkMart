import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export {
	createOrderResponseSchema,
	getLogisticsSchema,
	getOrdersSchema,
	orderDetailsSchema,
	postLogisticsSchema,
};
export type {
	CreateOrderDto,
	GetOrderDto,
	LogisticsDto,
	OrderDetailsDto,
	PostLogisticDto,
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
	createdAt: z.string(),
});

const getOrdersSchema = z.array(getOrderResponseSchema);

type GetOrderDto = z.infer<typeof getOrderResponseSchema>;

const orderDetailsSchema = getOrderResponseSchema.extend({
	updatedAt: z.string(),
	requestId: ulid,
	locationName: z.string().min(1),
	createdBy: z.string().min(1),
	images: z.array(z.string().url()),
	itemDetail: z.record(z.string()).nullable(),
	url: z.string().url().nullable(),
	requestRemark: z.string().nullable(),
	offerPrice: z.number().positive().nullable(),
	categoryName: z.string().min(1),
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
