import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string(),
});
export const signUpSchema = z
	.object({
		email: z.string().email("Invalid email"),
		password: z
			.string()
			// `?=`: positive lookahead `.`: any character, `*`: zero or more times =>
			// `?=.*[a-zA-Z]`: a- zA - Z can have 0 or more characters before it
			.refine((val) => /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(val), {
				message:
					"Password must contain at least one letter, one number and be > 8 characters long",
			}),
		confirmPassword: z.string(),
	})
	.refine((input) => input.password === input.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
export type SignInDto = z.infer<typeof signInSchema>;

export type SignUpDto = z.infer<typeof signUpSchema>;
