import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export { createOrderParamsSchema };
export type { CreateOrderParams };

const createOrderParamsSchema = z.object({
	success: z
		.string()
		.refine((value) => value === "true", { message: "success must be true" }),
	offerId: ulid,
	userAddressId: z.string().refine((value) => parseInt(value) > 0, {
		message: "userAddressId must be a positive integer",
	}),
	// price: z.string().refine((value) => parseFloat(value) > 0, {
	// 	message: "price must be a positive number",
	// }),
});
type CreateOrderParams = z.infer<typeof createOrderParamsSchema>;
