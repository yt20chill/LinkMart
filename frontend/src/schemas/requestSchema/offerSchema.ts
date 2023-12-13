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

export type OfferForm = Record<keyof z.infer<typeof postOfferSchema>, string>;
