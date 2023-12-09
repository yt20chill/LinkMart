import { z } from "zod";
import { resultId } from "../../../lib/schemaUtils";

const categoryResponseSchema = z.object({
	categoryId: resultId,
	categoryName: z.string().min(1),
});

const categoriesResponseSchema = z.array(categoryResponseSchema);

const locationResponseSchema = z.object({
	locationId: resultId,
	locationName: z.string().min(1),
});

const locationsResponseSchema = z.array(locationResponseSchema);

const categoryFieldOptionResponseSchema = z.object({
	categoryFieldOptionId: resultId,
	categoryFieldOptionName: z.string().min(1),
});

const categoryFieldResponseSchema = z.object({
	categoryFieldName: z.string().min(1),
	categoryFieldIsOption: z.boolean(),
	categoryFieldOption: z.array(categoryFieldOptionResponseSchema).nullable(),
});

const categoryFieldsResponseSchema = z.array(categoryFieldResponseSchema);

const requestResponseSchema = z.object({
	locationId: resultId,
	locationName: z.string().min(1),
	item: z.string().min(1),
	image: z.string().url(),
	offerPrice: z.number().positive().nullable(),
	createdBy: z.string().min(1),
	updatedAt: z.string().datetime(),
});

const requestsResponseSchema = z.array(requestResponseSchema);

export {
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestsResponseSchema,
};
