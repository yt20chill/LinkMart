import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export { getApplicationStatusResponseSchema, postProviderDtoSchema };
export type { ApplyProviderDto, GetApplicationStatusDto };

const postProviderDtoSchema = z.object({
	providerId: ulid,
});

type ApplyProviderDto = z.infer<typeof postProviderDtoSchema>;

const applicationStatusSchema = z.object({
	verificationId: ulid,
	statusName: z.string().min(1),
	idDocument: z.string().url(),
	addressDocument: z.string().url(),
	bankDocument: z.string().url(),
});
const getApplicationStatusResponseSchema = z.object({
	data: applicationStatusSchema.nullable(),
});

type GetApplicationStatusDto = z.infer<
	typeof getApplicationStatusResponseSchema
>;
