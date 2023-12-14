import { z } from "zod";

const postAddressSchema = z.object({
	address: z.string().min(1, { message: "required" }),
});

const postAddressDtoSchema = z.object({
	address: z.string().array(),
});

type TPostAddressForm = z.infer<typeof postAddressSchema>;
type PostAddressDto = z.infer<typeof postAddressDtoSchema>;

export { postAddressDtoSchema, postAddressSchema };
export type { PostAddressDto, TPostAddressForm };
