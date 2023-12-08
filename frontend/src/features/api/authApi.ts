import { FetchError, authApiRoutes, axiosWrapper } from "../../lib/apiUtils";
import { AuthorizeLevel, SignInDto, SignUpDto } from "../../types/authModels";
import { BaseFetchResult } from "../../types/fetchModels";

type SignInResult = BaseFetchResult & {
	jwt: string;
};

type SignUpResult = BaseFetchResult & {
	jwt: string;
};

type GetAuthResult = BaseFetchResult & {
	username: string;
	role: AuthorizeLevel;
};

export const signInAJAX = async (signInDto: SignInDto) => {
	const { jwt } = await axiosWrapper<SignInDto, SignInResult>(
		authApiRoutes.SIGN_IN,
		"post",
		signInDto
	);
	if (jwt) return jwt;
	throw new FetchError(500, "invalid token");
};

export const signUpAJAX = async (
	signUpDto: Omit<SignUpDto, "confirmPassword">
): Promise<string> => {
	const { jwt } = await axiosWrapper<typeof signUpDto, SignUpResult>(
		authApiRoutes.SIGN_UP,
		"post",
		signUpDto
	);
	if (jwt) return jwt;
	throw new FetchError(500, "invalid token");
};

export const getAuthAJAX = async (): Promise<GetAuthResult> => {
	const { username, role } = await axiosWrapper<void, GetAuthResult>(
		authApiRoutes.GET_AUTH
	);
	if (role === null) return { username, role: AuthorizeLevel.USER };
	return { username, role: AuthorizeLevel.PROVIDER };
};
