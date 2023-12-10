import z from "zod";
import {
	emptyStringToNull,
	requiredId,
	stringToPositiveNumber,
	zodJson,
} from "../../../lib/schemaUtils";

export const allowedFileTypes = ["image/png", "image/jpeg"];

export const postRequestSchema = z.object({
	locationId: requiredId,
	categoryId: requiredId,
	imageFile: z
		.instanceof(Array<File>)
		.refine(
			(files) => {
				for (const file of files) {
					if (!allowedFileTypes.includes(file.type)) return false;
				}
				return true;
			},
			{
				message: "image must be in png or jpeg format",
			}
		)
		.refine((files) => files.length > 0, { message: "required" }),
	item: z.string().min(1, { message: "required" }),
	url: emptyStringToNull.pipe(
		z.string().url({ message: "invalid url" }).nullable()
	),
	quantity: stringToPositiveNumber().pipe(
		z.number().int().positive({ message: "invalid quantity" })
	),
	requestRemark: emptyStringToNull.nullable(),
	offerPrice: stringToPositiveNumber({ isFloat: true }).pipe(
		z.number().positive().nullable()
	),
	itemDetail: zodJson,
});

export const getRequestsQuerySchema = z.object({
	page: z.number().int().positive().optional(),
	category: z.string().optional(),
	location: z.string().optional(),
});
export type GetRequestsQuery = z.infer<typeof getRequestsQuerySchema>;

export const requestIdSchema = z.object({
	requestId: z.string().ulid(),
});

export const categoryIdSchema = z.object({
	categoryId: z.number().int().positive(),
});

export type RequestId = z.infer<typeof requestIdSchema>;
export type CategoryId = z.infer<typeof categoryIdSchema>;

export const deleteImageParamsSchema = z.object({
	imageId: z.number().int().positive(),
});

export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;

type PostRequestDto = z.infer<typeof postRequestSchema>;
export type RequestForm = Record<
	Exclude<keyof PostRequestDto, "imageFile">,
	string | null
> & {
	imageFile: File[];
};
