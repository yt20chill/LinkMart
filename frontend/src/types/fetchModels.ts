import z from "zod";
import {
	baseResponseSchema,
	categoriesResponseSchema,
	categoryFieldsResponseSchema,
	locationsResponseSchema,
	requestsResponseSchema,
	signInResponseSchema,
	signUpResponseSchema,
	userResponseSchema,
} from "../features/api/schema";
type BaseFetchResult = z.infer<typeof baseResponseSchema>;
type CategoriesResult = z.infer<typeof categoriesResponseSchema>;
type CategoryFieldsResult = z.infer<typeof categoryFieldsResponseSchema>;
type LocationsResult = z.infer<typeof locationsResponseSchema>;
type RequestsResult = z.infer<typeof requestsResponseSchema>;
type SignInResult = z.infer<typeof signInResponseSchema>;
type SignUpResult = z.infer<typeof signUpResponseSchema>;
type UserResult = z.infer<typeof userResponseSchema>;

export type {
	BaseFetchResult,
	CategoriesResult,
	CategoryFieldsResult,
	LocationsResult,
	RequestsResult,
	SignInResult,
	SignUpResult,
	UserResult,
};
