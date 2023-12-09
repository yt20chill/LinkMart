import { z } from "zod";
import { baseResponseSchema } from ".";

export const userResponseSchema = baseResponseSchema.merge(
	z.object({
		username: z.string().min(1),
		providerId: z.string().ulid().nullable(),
	})
);
