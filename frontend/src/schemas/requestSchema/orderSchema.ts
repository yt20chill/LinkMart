import { z } from "zod";
import {
	emptyStringToUndefined,
	requiredId,
	ulid,
} from "../../lib/schemaUtils";

export {
	createOrderParamsSchema,
	postLogisticCompanyFormSchema,
	reportFormSchema,
	reviewOrderFormSchema,
	uploadShippingFormSchema,
};
export type {
	CreateOrderParams,
	TPostLogisticCompanyForm,
	TReportForm,
	TReviewOrderForm,
	TUploadShippingForm,
};

const createOrderParamsSchema = z.object({
	success: z
		.string()
		.refine((value) => value === "true", { message: "success must be true" }),
	offerId: ulid,
	userAddressId: z.string().refine((value) => parseInt(value) > 0, {
		message: "userAddressId must be a positive integer",
	}),
	// price: z.string().refine((value) => parseFloat(value) > 0, {
	// 	message: "price must be a positive number",
	// }),
});
type CreateOrderParams = z.infer<typeof createOrderParamsSchema>;

const postLogisticCompanyFormSchema = z.object({
	companyName: z.string().min(1),
	companyUrl: z.string().url(),
});

type TPostLogisticCompanyForm = z.infer<typeof postLogisticCompanyFormSchema>;

const uploadShippingFormSchema = z.object({
	logisticCompanyId: requiredId,
	shippingOrderNo: z.string().min(1),
	shipmentProof: z
		.instanceof(FileList)
		.refine((fileList) => fileList.length > 0, { message: "required" }),
});

type TUploadShippingForm = Record<
	Exclude<keyof z.infer<typeof uploadShippingFormSchema>, "shipmentProof">,
	string
> & { shipmentProof: File | null };

const reviewOrderFormSchema = z.object({
	efficiency: z
		.string()
		.transform((val) => +val / 2)
		.pipe(z.number().min(0).max(5)),
	attitude: z
		.string()
		.transform((val) => +val / 2)
		.pipe(z.number().min(0).max(5)),
	comments: emptyStringToUndefined,
});

type TReviewOrderForm = Record<
	keyof z.infer<typeof reviewOrderFormSchema>,
	string
>;

const reportFormSchema = z.object({
	subject: z.string(),
	content: z.string().min(1),
});

type TReportForm = z.infer<typeof reportFormSchema>;
