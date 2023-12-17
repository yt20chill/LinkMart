import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

export { addressesResponseSchema, getOrdersSchema, userResponseSchema };
export type { AddressDto, GetOrderDto, UserDto };

const userResponseSchema = z.object({
	username: z.string().min(1),
	providerId: ulid.nullable(),
});

type UserDto = z.infer<typeof userResponseSchema>;

const addressResponseSchema = z.object({
	addressId: resultId,
	address: z.string().min(1),
});

const addressesResponseSchema = z.array(addressResponseSchema);

type AddressDto = z.infer<typeof addressResponseSchema>;

const getOrderResponseSchema = z.object({
	orderId: ulid,
	orderStatus: z.string().min(1),
	providerId: ulid,
	providerName: z.string().min(1),
	item: z.string().min(1),
	primaryImage: z.string().url(),
	quantity: z.string().min(1),
	price: z.number().positive(),
	createdAt: z.string(),
});

const getOrdersSchema = z.array(getOrderResponseSchema);

type GetOrderDto = z.infer<typeof getOrderResponseSchema>;
