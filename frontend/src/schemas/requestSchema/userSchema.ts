import { z } from "zod";

const addressSchema = z.object({
	address: z.string().min(1, { message: "required" }),
});

const postAddressFormSchema = z.object({
	address: z
		.array(addressSchema)
		.nonempty({ message: "should append at least one address" }),
});

const postAddressDtoSchema = z.object({
	address: z.string().array(),
});

type TPostAddressForm = z.infer<typeof postAddressFormSchema>;
type PostAddressDto = z.infer<typeof postAddressDtoSchema>;

export { postAddressDtoSchema, postAddressFormSchema };
export type { PostAddressDto, TPostAddressForm };
