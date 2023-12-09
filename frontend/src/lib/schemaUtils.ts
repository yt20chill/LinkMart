import { z } from "zod";

export const emptyStringToNull = z
	.string()
	.transform((value) => (value ? value : null));

export const stringToPositiveNumber = (
	option: { isFloat: boolean } = { isFloat: false }
) =>
	z
		.string()
		.transform((value) => {
			if (value === "") return null;
			if (option.isFloat) return parseFloat(value);
			return parseInt(value);
		})
		.pipe(z.number().positive({ message: "invalid number" }).nullable());

export const requiredId = z
	.string()
	.transform((value) => parseInt(value))
	.pipe(z.number().int().positive({ message: "invalid option" }));
