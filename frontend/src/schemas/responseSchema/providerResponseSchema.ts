import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export {
	getApplicationStatusResponseSchema,
	getProviderDashboardSchema,
	getProviderProfileSchema,
};
export type {
	ApplicationStatus,
	GetApplicationStatusDto,
	GetProviderProfileDto,
	GetReviewDto,
	ProviderDashboardDto,
};

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

const getProviderProfileSchema = z.object({
	biography: z.string().nullable(),
	reviews: z.array(getReviewsSchema),
	providerName: z.string().min(1),
	starOfEfficiency: z.number().min(0).max(5),
	starOfAttitude: z.number().min(0).max(5),
	numberOfReviews: z.number().nonnegative(),
});

type GetProviderProfileDto = z.infer<typeof getProviderProfileSchema>;

const getProviderDashboardSchema = z.object({
	balance: z.number().nonnegative().nullable(),
	reviewCount: z.number().nonnegative().nullable(),
	offerCount: z.number().nonnegative(),
	activeTaskCount: z.number().nonnegative(),
	completedTaskCount: z.number().nonnegative(),
	averageEfficiency: z.number().min(0).max(5),
	averageAttitude: z.number().min(0).max(5),
});

type ProviderDashboardDto = z.infer<typeof getProviderDashboardSchema>;
