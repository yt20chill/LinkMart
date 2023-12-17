import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

export { acceptOfferResponseSchema, requestOffersResponseSchema };
export type { AcceptOfferResponseDto, RequestOfferDto };

const requestOfferResponseSchema = z.object({
	offerId: ulid,
	providerId: ulid,
	providerName: z.string().min(1),
	efficiency: z.number().positive().max(5),
	attitude: z.number().positive().max(5),
	statusName: z.string().min(1),
	price: z.number().positive(),
	estimatedProcessTime: z.number().positive(),
	offerRemark: z.string().nullable(),
});

const requestOffersResponseSchema = z.array(requestOfferResponseSchema);

type RequestOfferDto = z.infer<typeof requestOfferResponseSchema>;

// for mock payment
const acceptOfferResponseSchema = z.object({
	offerId: ulid,
	userAddressId: resultId,
	price: z.number().positive(),
});

type AcceptOfferResponseDto = z.infer<typeof acceptOfferResponseSchema>;
