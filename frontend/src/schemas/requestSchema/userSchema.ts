import { z } from "zod";
import { requiredId } from "../../lib/schemaUtils";

export { postAddressSchema, updateAddressFormSchema };
export type { PostAddressDto, UpdateAddressDto, UpdateAddressForm };

const postAddressSchema = z.object({
	address: z.string().min(1, { message: "required" }),
});

const updateAddressFormSchema = z.object({
	addressId: requiredId,
});

type PostAddressDto = z.infer<typeof postAddressSchema>;
type UpdateAddressForm = Record<
	keyof z.infer<typeof updateAddressFormSchema>,
	string
>;

type UpdateAddressDto = z.infer<typeof updateAddressFormSchema>;
