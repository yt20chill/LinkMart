import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

export { addressesResponseSchema, userResponseSchema };
export type { AddressDto, UserDto };

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
