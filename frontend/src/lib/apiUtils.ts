import axios, { isAxiosError } from "axios";

export const queryKey = Object.freeze({
	REQUEST: "request",
	OFFER: "offer",
	ORDER: "order",
	AUTH: "auth",
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.headers.common["Authorization"] =
	`Bearer ${localStorage.getItem("token")}` ?? undefined;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const authApiRoutes = Object.freeze({
	SIGN_IN: `/api/user/login`,
	SIGN_UP: `/api/user/registration`,
	GET_AUTH: `/api/user`,
});

export class FetchError extends Error {
	constructor(
		public readonly status: number = 500,
		public readonly message: string = "Something went wrong"
	) {
		super(message);
		Object.setPrototypeOf(this, FetchError.prototype);
	}
}

type ApiMethod = "get" | "post" | "put" | "delete";

export const axiosWrapper = async <PayloadType, ResultType>(
	url: string,
	method: ApiMethod = "get",
	data?: PayloadType
): Promise<ResultType> => {
	try {
		//TODO: remove this after testing
		console.log(`${method}ing ${url}...`);
		const result = await axios<ResultType>({
			method,
			url,
			data,
		});
		return result.data;
	} catch (error) {
		if (isAxiosError(error)) throw new FetchError(error.status, error.code);
		throw new FetchError();
	}
};
