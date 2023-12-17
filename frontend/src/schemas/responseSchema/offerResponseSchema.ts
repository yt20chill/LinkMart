import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

// for mock payment
const acceptOfferResponseSchema = z.object({
	offerId: ulid,
	userAddressId: resultId,
	price: z.number().positive(),
});

type AcceptOfferResponseDto = z.infer<typeof acceptOfferResponseSchema>;

export { acceptOfferResponseSchema };
export type { AcceptOfferResponseDto };
