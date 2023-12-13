import z from "zod";
import {
	emptyStringToNull,
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
	url: emptyStringToNull.pipe(
		z.string().url({ message: "invalid url" }).nullable()
	),
	quantity: stringToPositiveNumber().pipe(
		z.number().int().positive({ message: "invalid quantity" }).default(1)
	),
	requestRemark: emptyStringToNull.nullable(),
	offerPrice: stringToPositiveNumber({ isFloat: true }).pipe(
		z.number().positive().nullable()
	),
	itemDetail: z.record(z.string()),
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
	imageId: z.number().int().positive(),
});

export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;

type PostRequestDto = z.infer<typeof postRequestSchema>;
export type RequestForm = Record<
	Exclude<keyof PostRequestDto, "imageFile" | "itemDetail">,
	string
> & {
	imageFile: File[];
	itemDetail: Record<string, string>;
};
