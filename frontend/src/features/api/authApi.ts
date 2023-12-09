import { authApiRoutes, axiosWrapper } from "../../lib/apiUtils";
import { AuthorizeLevel, SignInDto, SignUpDto } from "../../types/authModels";
import {
	SignInResult,
	SignUpResult,
	UserResult,
} from "../../types/fetchModels";
import { AuthState } from "../stores/authStore";
import {
	signInResponseSchema,
	signUpResponseSchema,
	userResponseSchema,
} from "./responseSchema";

export const signInAJAX = async (
	signInDto: SignInDto
): Promise<SignInResult> => {
	return await axiosWrapper<SignInDto, SignInResult>(authApiRoutes.SIGN_IN, {
		method: "post",
		data: signInDto,
		schema: signInResponseSchema,
	});
};

export const signUpAJAX = async (
	signUpDto: Omit<SignUpDto, "confirmPassword">
): Promise<SignUpResult> => {
	return await axiosWrapper<typeof signUpDto, SignUpResult>(
		authApiRoutes.SIGN_UP,
		{ method: "post", data: signUpDto, schema: signUpResponseSchema }
	);
};

export const getAuthAJAX = async (): Promise<
	Omit<AuthState, "isAuthenticated">
> => {
	const { username, providerId } = await axiosWrapper<void, UserResult>(
		authApiRoutes.GET_AUTH,
		{ schema: userResponseSchema }
	);
	if (!providerId) return { username, role: AuthorizeLevel.USER };
	return { username, role: AuthorizeLevel.PROVIDER };
};
