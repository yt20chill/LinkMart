import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";
import { editProviderProfileSchema } from "../requestSchema";

export {
	getApplicationStatusResponseSchema,
	getProviderDashboardSchema,
	getProviderProfileSchema,
	postProviderDtoSchema,
};
export type {
	ApplicationStatus,
	ApplyProviderDto,
	GetApplicationStatusDto,
	GetProviderProfileDto,
	GetReviewDto,
	ProviderDashboardDto,
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
	username: z.string().min(1),
	primaryImage: z.string().url(),
	item: z.string().min(1),
	efficiency: z.number().min(0).max(5),
	attitude: z.number().min(0).max(5),
	comments: z.string().nullish(),
});

type GetReviewDto = z.infer<typeof getReviewsSchema>;

const getProviderProfileSchema = editProviderProfileSchema.extend({
	reviews: z.array(getReviewsSchema),
	username: z.string().min(1),
	starOfEfficiency: z.number().min(0).max(5),
	startOfAttitude: z.number().min(0).max(5),
	numberOfReviews: z.number().nonnegative(),
});

type GetProviderProfileDto = z.infer<typeof getProviderProfileSchema>;

const getProviderDashboardSchema = z.object({
	balance: z.number().nonnegative(),
	reviewCount: z.number().nonnegative(),
	offerCount: z.number().nonnegative(),
	taskCount: z.number().nonnegative(),
	averageEfficiency: z.number().min(0).max(5),
	averageAttitude: z.number().min(0).max(5),
});

type ProviderDashboardDto = z.infer<typeof getProviderDashboardSchema>;
