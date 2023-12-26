import z from "zod";
import {
	emptyStringToUndefined,
	requiredId,
	stringToPositiveNumber,
} from "../../lib/schemaUtils";

export const allowedFileTypes = ["image/png", "image/jpeg"];

export const postRequestSchema = z.object({
	locationId: requiredId,
	categoryId: requiredId,
	imageFile: z
		.instanceof(FileList)
		.transform((files) => Array.from(files))
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
	url: emptyStringToUndefined.pipe(
		z.string().url({ message: "invalid url" }).nullish()
	),
	quantity: z
		.string()
		.refine((val) => !isNaN(parseInt(val)), { message: "Invalid quantity" }),
	requestRemark: emptyStringToUndefined.nullable(),
	offerPrice: stringToPositiveNumber({ isFloat: true }).pipe(
		z.number().positive().nullish()
	),
	itemDetail: z.record(z.string()).nullish(),
});

export const editRequestSchema = postRequestSchema.extend({
	imageFile: z
		.instanceof(FileList)
		.transform((files) => Array.from(files))
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
		.nullish(),
});

export const requestIdSchema = z.object({
	requestId: z.string().ulid(),
});

export const categoryIdSchema = z.object({
	categoryId: z.number().int().positive(),
});

export type RequestId = z.infer<typeof requestIdSchema>;
export type CategoryId = z.infer<typeof categoryIdSchema>;

export const deleteImageParamsSchema = z.object({
	imageId: requiredId,
});

export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;

export type PostRequestDto = z.infer<typeof postRequestSchema>;

export type EditRequestDto = z.infer<typeof editRequestSchema>;

// For defaultValues to match type
export type RequestForm = Record<
	Exclude<keyof PostRequestDto, "imageFile" | "itemDetail">,
	string
> & {
	imageFile: File[];
	itemDetail: Record<string, string> | null;
};
