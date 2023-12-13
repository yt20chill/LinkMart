import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export const postOfferSchema = z.object({
	requestId: ulid,
	price: z
		.string()
		.transform((val) => parseFloat(val))
		.pipe(z.number().positive()),
	offerRemark: z.string().nullable(),
});

export type PostOfferDto = z.infer<typeof postOfferSchema>;

export type OfferForm = Record<
	Exclude<keyof PostOfferDto, "requestId">,
	string
>;
