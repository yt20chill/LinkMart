import { authApiRoutes, axiosWrapper } from "../../lib/apiUtils";
import { AuthorizeLevel } from "../../types/authModels";
import { SignInDto, SignUpDto } from "../forms/requestSchema";

import { AuthState } from "../stores/authStore";
import {
	AuthDto,
	UserDto,
	authResponseSchema,
	userResponseSchema,
} from "./responseSchema";

export const signInAJAX = async (signInDto: SignInDto): Promise<AuthDto> => {
	return await axiosWrapper<SignInDto, AuthDto>(authApiRoutes.SIGN_IN, {
		method: "post",
		data: signInDto,
		schema: authResponseSchema,
	});
};

export const signUpAJAX = async (
	signUpDto: Omit<SignUpDto, "confirmPassword">
): Promise<AuthDto> => {
	return await axiosWrapper<typeof signUpDto, AuthDto>(authApiRoutes.SIGN_UP, {
		method: "post",
		data: signUpDto,
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
