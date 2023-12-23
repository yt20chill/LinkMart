import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";
import { editProviderProfileSchema } from "../requestSchema";

export {
	getApplicationStatusResponseSchema,
	getProviderProfileSchema,
	postProviderDtoSchema,
};
export type {
	ApplicationStatus,
	ApplyProviderDto,
	GetApplicationStatusDto,
	GetProviderProfileDto,
};

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

const getReviewsSchema = z.object({
	primaryImage: z.string().url(),
	item: z.string().min(1),
	efficiency: z.number().min(0).max(5),
	attitude: z.number().min(0).max(5),
	comments: z.string().nullish(),
});

const getProviderProfileSchema = editProviderProfileSchema.extend({
	reviews: z.array(getReviewsSchema).nullish(),
	username: z.string().min(1),
	averageEfficiency: z.number().min(0).max(5),
	averageAttitude: z.number().min(0).max(5),
	totalReviews: z.number().nonnegative(),
});

type GetProviderProfileDto = z.infer<typeof getProviderProfileSchema>;
