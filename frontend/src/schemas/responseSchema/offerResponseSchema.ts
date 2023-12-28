import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";
export {
	acceptOfferResponseSchema,
	hasOfferedResponseSchema,
	providerOfferDetailSchema,
	providerOffersResponseSchema,
	requestOffersResponseSchema,
};
export type {
	AcceptOfferResponseDto,
	BriefOfferResponseDto,
	HasOfferedDto,
	OfferDetailsDto,
	ProviderOfferDetailDto,
	ProviderOfferDto,
};

const requestOfferResponseSchema = z.object({
	offerId: ulid,
	providerId: ulid,
	providerName: z.string().min(1),
	efficiency: z.number().min(0).max(5),
	attitude: z.number().min(0).max(5),
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

const providerOffersResponseSchema = z.array(providerOfferResponseSchema);

type ProviderOfferDto = z.infer<typeof providerOfferResponseSchema>;

const providerOfferDetailSchema = providerOfferResponseSchema.extend({
	offerRemark: z.string().nullable(),
});

type ProviderOfferDetailDto = z.infer<typeof providerOfferDetailSchema>;

const offerDtoSchema = z.object({
	offerId: ulid,
	estimatedProcessTime: z.number().positive(),
	price: z.number().positive(),
	offerRemark: z.string().nullable(),
});

const hasOfferedResponseSchema = z
	.object({
		hasOffer: z.literal(true),
		offer: offerDtoSchema,
	})
	.or(z.object({ hasOffer: z.literal(false), offer: z.null() }));

type HasOfferedDto = z.infer<typeof hasOfferedResponseSchema>;

type BriefOfferResponseDto = z.infer<typeof offerDtoSchema>;
