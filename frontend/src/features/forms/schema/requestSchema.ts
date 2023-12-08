import z from "zod";

const allowedFileTypes = ["image/png", "image/jpeg"];

export const requestSchema = z.object({
	location: z.coerce.number().int().positive({ message: "required" }),
	category: z.coerce.number().int().positive({ message: "required" }),
	item: z.string().min(1, { message: "required" }),
	image: z
		.instanceof(File)
		.refine((file) => allowedFileTypes.includes(file.type), {
			path: ["image"],
			message: "image must be in png or jpeg format",
		}),
	url: z.string().url({ message: "invalid url" }).optional(),
	qty: z.coerce.number().int().positive({ message: "invalid quantity" }),
	remarks: z.string().transform((value) => (value === "" ? undefined : value)),
	price: z.coerce.number().int().positive().optional(),
});
