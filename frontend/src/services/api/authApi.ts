import { TSignInForm, TSignUpForm } from "../../schemas/requestSchema";
import { AuthorizeLevel } from "../../types/authModels";

import { axiosWrapper } from "../../lib/apiUtils";
import {
	AuthDto,
	UserDto,
	authResponseSchema,
	userResponseSchema,
} from "../../schemas/responseSchema";
import { authApiRoutes } from "../query.config";
import { AuthState } from "../stores/authStore";

export const signInAJAX = async (signInForm: TSignInForm): Promise<AuthDto> => {
	return await axiosWrapper<TSignInForm, AuthDto>(authApiRoutes.SIGN_IN, {
		method: "post",
		data: signInForm,
		schema: authResponseSchema,
	});
};

export const signUpAJAX = async (
	signUpForm: Omit<TSignUpForm, "confirmPassword">
): Promise<AuthDto> => {
	return await axiosWrapper<typeof signUpForm, AuthDto>(authApiRoutes.SIGN_UP, {
		method: "post",
		data: signUpForm,
		schema: authResponseSchema,
	});
};

export const getAuthAJAX = async (): Promise<
	Omit<AuthState, "isAuthenticated">
> => {
	const { username, providerId } = await axiosWrapper<void, UserDto>(
		authApiRoutes.GET_AUTH,
		{ schema: userResponseSchema }
	);
	if (!providerId) return { username, role: AuthorizeLevel.USER };
	return { username, role: AuthorizeLevel.PROVIDER };
};
