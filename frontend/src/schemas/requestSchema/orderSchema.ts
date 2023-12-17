import { z } from "zod";
import { requiredId, ulid } from "../../lib/schemaUtils";
const acceptOfferSchema = z.object({
	offerId: ulid,
	userAddressId: requiredId.or(z.number().int().positive()),
});

const acceptOfferFormSchema = acceptOfferSchema.omit({ offerId: true });

type AcceptOfferDto = z.infer<typeof acceptOfferSchema>;

type TAcceptOfferForm = Record<
	Exclude<keyof AcceptOfferDto, "offerId">,
	string
>;

export { acceptOfferFormSchema, acceptOfferSchema };

export type { AcceptOfferDto, TAcceptOfferForm };
