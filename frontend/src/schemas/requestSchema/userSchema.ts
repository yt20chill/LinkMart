import { z } from "zod";
import { emptyStringToUndefined, requiredId } from "../../lib/schemaUtils";

export { postAddressSchema, putProfileSchema, updateAddressFormSchema };
export type {
	PostAddressDto,
	UpdateAddressDto,
	UpdateAddressForm,
	UpdateProfileForm,
};

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

const putProfileSchema = z
	.object({
		password: emptyStringToUndefined.refine(
			(val) => !val || /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(val),
			{
				message:
					"Password must contain at least one letter, one number and be > 8 characters long",
			}
		),
		confirmPassword: emptyStringToUndefined,
		username: z
			.string()
			.min(5, { message: "Username must be at least 5 characters long" })
			.refine((val) => /\w+/.test(val), {
				message: "Username must be alphanumeric",
			}),
	})
	.partial()
	.refine((input) => input.password === input.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type UpdateProfileForm = z.infer<typeof putProfileSchema>;
