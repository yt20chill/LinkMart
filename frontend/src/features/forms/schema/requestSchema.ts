import z from "zod";
import {
	emptyStringToUndefined,
	requiredId,
	stringToPositiveNumber,
} from "../../../lib/schemaUtils";

const allowedFileTypes = ["image/png", "image/jpeg"];

export const requestSchema = z.object({
	location: requiredId,
	category: requiredId,
	images: z
		.instanceof(Array<File>)
		.refine((files) => files.length > 0, { message: "required" })
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
	url: emptyStringToUndefined.pipe(
		z.string().url({ message: "invalid url" }).optional()
	),
	qty: stringToPositiveNumber().pipe(
		z.number().int().positive({ message: "invalid quantity" })
	),
	remarks: emptyStringToUndefined.optional(),
	price: stringToPositiveNumber({ isFloat: true }).pipe(
		z.number().positive().optional()
	),
});
