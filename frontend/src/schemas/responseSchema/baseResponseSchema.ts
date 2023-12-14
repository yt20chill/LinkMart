import { z } from "zod";

export const errorResponseSchema = z.object({
	message: z.string(),
});

export type ErrorResponseDto = z.infer<typeof errorResponseSchema>;
