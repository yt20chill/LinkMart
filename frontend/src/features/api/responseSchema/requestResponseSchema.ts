import { z } from "zod";
import { resultId, zodJson } from "../../../lib/schemaUtils";

const categoryResponseSchema = z.object({
	categoryId: resultId,
	categoryName: z.string().min(1),
});

const categoriesResponseSchema = z.array(categoryResponseSchema);

type CategoryDto = z.infer<typeof categoryResponseSchema>;

const locationResponseSchema = z.object({
	locationId: resultId,
	locationName: z.string().min(1),
});

const locationsResponseSchema = z.array(locationResponseSchema);

type LocationDto = z.infer<typeof locationResponseSchema>;

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

type CategoryFieldDto = z.infer<typeof categoryFieldResponseSchema>;

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

type RequestDto = z.infer<typeof requestResponseSchema>;

const imageSchema = z.object({
	imageId: resultId,
	imagePath: z.string().url(),
});

type ImageDto = z.infer<typeof imageSchema>;

const requestDetailsResponseSchema = requestResponseSchema.extend({
	itemDetail: zodJson,
	categoryId: resultId,
	categoryName: z.string().min(1),
	images: z.array(imageSchema),
	quantity: z.number().int().positive(),
	requestRemark: z.string().nullable(),
	createdAt: z.string().datetime(),
});

type RequestDetailsDto = z.infer<typeof requestDetailsResponseSchema>;

export {
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestDetailsResponseSchema,
	requestsResponseSchema,
};

export type {
	CategoryDto,
	CategoryFieldDto,
	ImageDto,
	LocationDto,
	RequestDetailsDto,
	RequestDto,
};
