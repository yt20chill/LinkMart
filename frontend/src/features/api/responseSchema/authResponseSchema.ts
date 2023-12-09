import { z } from "zod";

export const authResponseSchema = z.object({
	jwt: z.string().min(1),
});

export type AuthDto = z.infer<typeof authResponseSchema>;
