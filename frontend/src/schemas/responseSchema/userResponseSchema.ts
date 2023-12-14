import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

const userResponseSchema = z.object({
	username: z.string().min(1),
	providerId: ulid.nullable(),
});

type UserDto = z.infer<typeof userResponseSchema>;

const addressResponseSchema = z.object({
	addressId: resultId,
	address: z.string().min(1),
});

type AddressDto = z.infer<typeof addressResponseSchema>;

export { addressResponseSchema, userResponseSchema };

export type { AddressDto, UserDto };
