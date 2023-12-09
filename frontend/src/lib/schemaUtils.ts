import { z } from "zod";

export const emptyStringToUndefined = z
	.string()
	.transform((value) => (value ? value : undefined));

export const stringToPositiveNumber = (
	option: { isFloat: boolean } = { isFloat: false }
) =>
	z
		.string()
		.transform((value) => {
			if (value === "") return undefined;
			if (option.isFloat) return parseFloat(value);
			return parseInt(value);
		})
		.pipe(z.number().positive({ message: "invalid number" }).optional());

export const requiredId = z
	.string()
	.transform((value) => parseInt(value))
	.pipe(z.number().int().positive({ message: "invalid option" }));
