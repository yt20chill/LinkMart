import { z } from "zod";
import { resultId, ulid } from "../../lib/schemaUtils";

export {
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	postRequestResponseSchema,
	requestDetailsResponseSchema,
	requestDtoSchema as requestDtoV1Schema,
	requestExtendOfferDtoCountSchema,
	requestsResponseSchema,
};

export type {
	CategoryDto,
	CategoryFieldDto,
	ImageDto,
	LocationDto,
	PostRequestResponseDto,
	RequestDetailsDto,
	RequestDto,
	RequestExtendOfferCountDto,
	RequestsDto,
};

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

const categoryFieldResponseSchema = z.object({
	categoryFieldId: resultId,
	categoryFieldName: z.string().min(1),
	categoryFieldOptions: z.array(z.string()),
});

const categoryFieldsResponseSchema = z.array(categoryFieldResponseSchema);

type CategoryFieldDto = z.infer<typeof categoryFieldResponseSchema>;

const requestDtoSchema = z.object({
	requestId: ulid,
	locationName: z.string().min(1),
	item: z.string().min(1),
	primaryImage: z.string().url(),
	offerPrice: z
		.number()
		.nonnegative()
		.transform((val) => (val === 0 ? null : val))
		.nullable(),
	createdBy: z.string().min(1),
	updatedAt: z.string(),
});

const requestExtendOfferDtoCountSchema = requestDtoSchema.extend({
	offerCount: z.number().nonnegative(),
});

type RequestDto = z.infer<typeof requestDtoSchema>;
type RequestExtendOfferCountDto = z.infer<
	typeof requestExtendOfferDtoCountSchema
>;

const requestsResponseSchema = z.object({
	totalRecords: z.number().nonnegative(),
	totalPages: z.number().nonnegative(),
	requests: z.array(requestDtoSchema),
});

type RequestsDto = z.infer<typeof requestsResponseSchema>;

const imageSchema = z.object({
	imageId: resultId,
	imagePath: z.string().url(),
});

type ImageDto = z.infer<typeof imageSchema>;

const requestDetailsResponseSchema = requestDtoSchema.extend({
	itemDetail: z.record(z.string().nullable()).nullable(),
	locationId: resultId,
	categoryId: resultId,
	categoryName: z.string().min(1),
	images: z.array(imageSchema),
	url: z.string().url().nullable(),
	quantity: z.string().min(1),
	requestRemark: z.string().nullable(),
	createdAt: z.string(),
});

type RequestDetailsDto = z.infer<typeof requestDetailsResponseSchema>;

const postRequestResponseSchema = z.object({
	requestId: ulid,
});

type PostRequestResponseDto = z.infer<typeof postRequestResponseSchema>;
