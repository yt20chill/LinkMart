import { z } from "zod";

const emptyStringToNull = z
	.string()
	.transform((value) => (value ? value : null));

const stringToPositiveNumber = (
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

const requiredId = z
	.string()
	.transform((value) => parseInt(value))
	.pipe(z.number().int().positive({ message: "invalid option" }));

const resultId = z.number().int().positive();

const ulid = z.string().ulid();

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const zodJson: z.ZodType<Json> = z.lazy(() =>
	z.union([literalSchema, z.array(zodJson), z.record(zodJson)])
);

const zeroToNull = z
	.number()
	.nonnegative()
	.transform((value) => (value === 0 ? null : value + ""))
	.nullable();

export {
	emptyStringToNull,
	requiredId,
	resultId,
	stringToPositiveNumber,
	ulid,
	zeroToNull,
};
