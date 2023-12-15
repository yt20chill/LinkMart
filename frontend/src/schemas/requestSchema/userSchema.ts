import { z } from "zod";
import { requiredId } from "../../lib/schemaUtils";

export { postAddressSchema, updatePrimaryAddressFormSchema };
export type {
	PostAddressDto,
	UpdatePrimaryAddressDto,
	UpdatePrimaryAddressForm,
};

const postAddressSchema = z.object({
	address: z.string().min(1, { message: "required" }),
});

const updatePrimaryAddressFormSchema = z.object({
	addressId: requiredId,
});

type PostAddressDto = z.infer<typeof postAddressSchema>;
type UpdatePrimaryAddressForm = Record<
	keyof z.infer<typeof updatePrimaryAddressFormSchema>,
	string
>;

type UpdatePrimaryAddressDto = z.infer<typeof updatePrimaryAddressFormSchema>;
