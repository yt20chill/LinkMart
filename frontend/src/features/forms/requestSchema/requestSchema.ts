import z from "zod";
import {
	emptyStringToNull,
	requiredId,
	stringToPositiveNumber,
} from "../../../lib/schemaUtils";

const allowedFileTypes = ["image/png", "image/jpeg"];

export const postRequestSchema = z.object({
	locationId: requiredId,
	categoryId: requiredId,
	imageFile: z
		.instanceof(Array<File>)
		.or(z.instanceof(File))
		.transform((file) => (Array.isArray(file) ? file : [file]))
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
		),
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
});

export const getRequestsQuerySchema = z.object({
	page: z.number().int().positive().optional(),
	category: z.string().optional(),
	location: z.string().optional(),
});
export type GetRequestsQuery = z.infer<typeof getRequestsQuerySchema>;

export const getRequestDetailsParamsSchema = z.object({
	requestId: z.string().ulid(),
});

export type GetRequestDetailsParams = z.infer<
	typeof getRequestDetailsParamsSchema
>;

type PostRequestDto = z.infer<typeof postRequestSchema>;
export type RequestForm = Record<
	Exclude<keyof PostRequestDto, "imageFile">,
	string | null
> & {
	imageFile: File[] | null;
};
