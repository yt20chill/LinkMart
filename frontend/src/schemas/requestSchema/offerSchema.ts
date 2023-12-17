import { z } from "zod";
import { requiredId, ulid } from "../../lib/schemaUtils";

export { acceptOfferDtoSchema, acceptOfferSchema, postOfferSchema };
export type {
	AcceptOfferDto,
	AcceptOfferPayload,
	OfferForm,
	PostOfferDto,
	TAcceptOfferForm,
};

const postOfferSchema = z.object({
	requestId: ulid,
	price: z
		.string()
		.transform((val) => parseFloat(val))
		.pipe(z.number().positive())
		.refine((value) => value > 0, { message: "Invalid Price" }),
	estimatedProcessTime: z
		.string()
		.transform((val) => parseInt(val))
		.pipe(z.number().positive())
		.refine((value) => value > 0, {
			message: "Invalid Process Time",
		}),
	offerRemark: z.string().nullable(),
});

type PostOfferDto = z.infer<typeof postOfferSchema>;

type OfferForm = Record<Exclude<keyof PostOfferDto, "requestId">, string>;

const acceptOfferSchema = z.object({
	userAddressId: requiredId.or(z.number().int().positive()),
});

const acceptOfferDtoSchema = acceptOfferSchema.extend({
	offerId: ulid,
});

type TAcceptOfferForm = Record<keyof z.infer<typeof acceptOfferSchema>, string>;
type AcceptOfferDto = z.infer<typeof acceptOfferDtoSchema>;
type AcceptOfferPayload = Omit<AcceptOfferDto, "offerId">;
