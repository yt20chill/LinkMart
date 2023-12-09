import { z } from "zod";

export const signUpResponseSchema = z.object({
	jwt: z.string().min(1),
});

export const signInResponseSchema = z.object({
	jwt: z.string().min(1),
});
