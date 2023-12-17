import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

const createOrderResponseSchema = z.object({
	orderId: ulid,
});

type CreateOrderDto = z.infer<typeof createOrderResponseSchema>;

export { createOrderResponseSchema };
export type { CreateOrderDto };
