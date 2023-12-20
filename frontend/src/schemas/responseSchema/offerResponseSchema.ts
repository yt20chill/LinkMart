import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

export {
	acceptOfferResponseSchema,
	providerOfferResponseSchema,
	requestOffersResponseSchema,
};
export type { AcceptOfferResponseDto, OfferDetailsDto, ProviderOfferDto };

const requestOfferResponseSchema = z.object({
	offerId: ulid,
	providerId: ulid,
	providerName: z.string().min(1),
	efficiency: z.number().positive().max(5),
	attitude: z.number().positive().max(5),
	reviewCount: z.number().int().nonnegative(),
	statusName: z.string().min(1),
	price: z.number().positive(),
	estimatedProcessTime: z.number().positive(),
	offerRemark: z.string().nullable(),
});

const requestOffersResponseSchema = z.array(requestOfferResponseSchema);

type OfferDetailsDto = z.infer<typeof requestOfferResponseSchema>;

// for mock payment
const acceptOfferResponseSchema = z.object({
	url: z.string().refine((val) => val.startsWith("/user/payment")),
	offerId: ulid,
	userAddressId: resultId,
	price: z.number().positive(),
});

type AcceptOfferResponseDto = z.infer<typeof acceptOfferResponseSchema>;

const providerOfferResponseSchema = z.object({
	offerId: ulid,
	requestId: ulid,
	item: z.string().min(1),
	offerStatus: z.string().min(1),
	estimatedProcessTime: z.number().positive(),
	createdBy: z.string().min(1),
	primaryImage: z.string().url(),
	price: z.number().positive(),
});

type ProviderOfferDto = z.infer<typeof providerOfferResponseSchema>;
