import axios from "axios";
import { FetchError, authApiRoutes } from "../../lib/apiUtils";
import { SignInDto } from "../../types/authModels";

type ApiMethod = "get" | "post" | "put" | "delete";

type BaseResult = {
	success: boolean;
};

type SignInResult = BaseResult & {
	token?: string;
	message?: string;
};

export const signInAJAX = async (signInDto: SignInDto) => {
	const result = await axios.post<SignInResult>(
		authApiRoutes.SIGN_IN,
		signInDto
	);
	if (!result.data.success) {
		throw new FetchError(result.data.message);
	}
};

export const axiosWrapper = async <PayloadType, ResultType>(
	method: ApiMethod,
	url: string,
	data: PayloadType
): Promise<ResultType> => {
	try {
		const result = await axios<ResultType>({
			method,
			url,
			data,
		});
	} catch (error) {}
};
