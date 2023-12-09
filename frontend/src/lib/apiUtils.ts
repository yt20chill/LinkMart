import axios, { isAxiosError } from "axios";
import { ZodError, ZodType } from "zod";

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
	SIGN_IN: `/user/login`,
	SIGN_UP: `/user/registration`,
	GET_AUTH: `/user`,
});

export const requestApiRoutes = Object.freeze({
	CATEGORY: `/categories`,
	LOCATION: `/locations`,
	REQUEST: `/request`,
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
	data?: PayloadType,
	schema?: ZodType<ResultType>
): Promise<typeof schema extends undefined ? void : ResultType> => {
	try {
		//TODO: remove this after testing
		console.log(`${method}ing ${url}...`);
		const response = await axios<ResultType>({
			method,
			url,
			data,
		});
		if (!schema) return undefined as ResultType;
		return schema.parse(response.data);
	} catch (error) {
		if (isAxiosError(error))
			throw new FetchError(error.status, error.message ?? error.code);
		if (error instanceof ZodError) throw new FetchError(400, error.message);
		throw new FetchError();
	}
};
