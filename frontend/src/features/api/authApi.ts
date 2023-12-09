import { authApiRoutes, axiosWrapper } from "../../lib/apiUtils";
import { AuthorizeLevel, SignInDto, SignUpDto } from "../../types/authModels";
import {
	SignInResult,
	SignUpResult,
	UserResult,
} from "../../types/fetchModels";
import { signInResponseSchema, signUpResponseSchema } from "./responseSchema";

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

export const getAuthAJAX = async (): Promise<UserResult> => {
	const { username, role } = await axiosWrapper<void, UserResult>(
		authApiRoutes.GET_AUTH
	);
	if (role === null) return { username, role: AuthorizeLevel.USER };
	return { username, role: AuthorizeLevel.PROVIDER };
};
