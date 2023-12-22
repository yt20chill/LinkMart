import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export { getApplicationStatusResponseSchema, postProviderDtoSchema };
export type { ApplicationStatus, ApplyProviderDto, GetApplicationStatusDto };

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
type ApplicationStatus = z.infer<typeof applicationStatusSchema>;
const getApplicationStatusResponseSchema = z.object({
	data: applicationStatusSchema.nullable(),
});

type GetApplicationStatusDto = z.infer<
	typeof getApplicationStatusResponseSchema
>;
