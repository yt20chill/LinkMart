import { z } from "zod";
import { requiredId } from "../../lib/schemaUtils";

const postAddressSchema = z.object({
	address: z.string().min(1, { message: "required" }),
});

const postAddressDtoSchema = z.object({
	address: z.string().array(),
});

const updatePrimaryAddressFormSchema = z.object({
	addressId: requiredId,
});

type TPostAddressForm = z.infer<typeof postAddressSchema>;
type PostAddressDto = z.infer<typeof postAddressDtoSchema>;
type UpdatePrimaryAddressForm = Record<
	keyof z.infer<typeof updatePrimaryAddressFormSchema>,
	string
>;

type UpdatePrimaryAddressDto = z.infer<typeof updatePrimaryAddressFormSchema>;

export {
	postAddressDtoSchema,
	postAddressSchema,
	updatePrimaryAddressFormSchema,
};
export type {
	PostAddressDto,
	TPostAddressForm,
	UpdatePrimaryAddressDto,
	UpdatePrimaryAddressForm,
};
