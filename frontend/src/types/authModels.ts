import { z } from "zod";
import {
	signInSchema,
	signUpSchema,
} from "../features/forms/schema/authSchema";

export enum AuthorizeLevel {
	PUBLIC,
	USER,
	PROVIDER,
	ADMIN,
}

export type SignInDto = z.infer<typeof signInSchema>;

export type SignUpDto = z.infer<typeof signUpSchema>;
