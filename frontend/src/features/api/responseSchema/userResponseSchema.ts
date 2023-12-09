import { z } from "zod";

export const userResponseSchema = z.object({
	username: z.string().min(1),
	providerId: z.string().ulid().nullable(),
});
