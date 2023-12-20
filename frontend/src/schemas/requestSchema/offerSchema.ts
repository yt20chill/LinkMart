import { z } from "zod";
import { requiredId, ulid } from "../../lib/schemaUtils";

export { acceptOfferDtoSchema, acceptOfferSchema, offerSchema };
export type {
	AcceptOfferDto,
	AcceptOfferPayload,
	OfferDto,
	TAcceptOfferForm,
	TOfferForm,
};

const offerSchema = z.object({
	price: z
		.string()
		.or(z.number())
		.transform((val) => +val)
		.pipe(z.number().positive())
		.refine((value) => value > 0, { message: "Invalid Price" }),
	estimatedProcessTime: z
		.string()
		.or(z.number())
		.transform((val) => +val)
		.pipe(z.number().positive())
		.refine((value) => value > 0, {
			message: "Invalid Process Time",
		}),
	offerRemark: z.string().nullable(),
});

type TOfferForm = Record<keyof z.infer<typeof offerSchema>, string>;
type OfferDto = z.infer<typeof offerSchema>;

const acceptOfferSchema = z.object({
	userAddressId: requiredId.or(z.number().int().positive()),
});

const acceptOfferDtoSchema = acceptOfferSchema.extend({
	offerId: ulid,
});

type TAcceptOfferForm = Record<keyof z.infer<typeof acceptOfferSchema>, string>;
type AcceptOfferDto = z.infer<typeof acceptOfferDtoSchema>;
type AcceptOfferPayload = Omit<AcceptOfferDto, "offerId">;
