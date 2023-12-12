import { authApiRoutes, axiosWrapper } from "../../lib/apiUtils";
import { SignInDto, SignUpDto } from "../../schemas/requestSchema";
import { AuthorizeLevel } from "../../types/authModels";

import {
	AuthDto,
	UserDto,
	authResponseSchema,
	userResponseSchema,
} from "../../schemas/responseSchema";
import { AuthState } from "../stores/authStore";

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
