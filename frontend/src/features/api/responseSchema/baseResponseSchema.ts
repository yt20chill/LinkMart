import { z } from "zod";

export const baseResponseSchema = z.object({
	message: z.string().optional(),
});

export type BaseResponseDto = z.infer<typeof baseResponseSchema>;
