import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export { createOrderResponseSchema, getOrdersSchema, orderDetailsSchema };
export type { CreateOrderDto, GetOrderDto, OrderDetailsDto };

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
	images: z.array(z.string().url()).nullable(),
	itemDetail: z.record(z.string()).nullable(),
	url: z.string().url().nullable(),
	requestRemark: z.string().nullable(),
});

type OrderDetailsDto = z.infer<typeof orderDetailsSchema>;
