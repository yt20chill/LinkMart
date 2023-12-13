import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";
const acceptOfferResponseSchema = z.object({
	orderId: ulid,
});

type AcceptOfferResponseDto = z.infer<typeof acceptOfferResponseSchema>;

export { acceptOfferResponseSchema };
export type { AcceptOfferResponseDto };
