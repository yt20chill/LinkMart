import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";
const acceptOfferSchema = z.object({
	offerId: ulid,
	shippingAddress: z.string().min(10, { message: "required" }),
});

const acceptOfferFormSchema = acceptOfferSchema.omit({ offerId: true });

type AcceptOfferDto = z.infer<typeof acceptOfferSchema>;

type TAcceptOfferForm = Omit<AcceptOfferDto, "offerId">;

export { acceptOfferFormSchema, acceptOfferSchema };

export type { AcceptOfferDto, TAcceptOfferForm };
