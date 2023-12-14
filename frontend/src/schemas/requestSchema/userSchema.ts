import { z } from "zod";

const postAddressSchema = z.object({
	address: z.array(z.string().min(1, { message: "required" })),
});

type AddAddressForm = z.infer<typeof postAddressSchema>;

export { postAddressSchema };
export type { AddAddressForm };
