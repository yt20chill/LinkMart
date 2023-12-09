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
	CATEGORY: `/api/category`,
	LOCATION: `/api/location`,
	REQUEST: `/api/request`,
	IMAGE: `/api/request/image`,
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
type AxiosWrapperReturnType<ResultType, OptionsType> = Promise<
	OptionsType extends {
		schema: ZodType<ResultType>;
	}
		? ResultType
		: void
>;

export const axiosWrapper = async <PayloadType, ResultType>(
	url: string,
	options?: {
		method?: ApiMethod;
		data?: PayloadType;
		schema?: ZodType<ResultType>;
	}
): Promise<ResultType> /*AxiosWrapperReturnType<ResultType, typeof options> */ => {
	try {
		const method = options?.method ?? "get";
		const isFormData = options?.data instanceof FormData;
		if (isFormData) delete axios.defaults.headers.common["Content-Type"];
		//TODO: remove this after testing
		console.log(`${method}ing ${url}...`);
		const response = await axios<ResultType>({
			method,
			url,
			data: options?.data,
		});
		if (isFormData)
			axios.defaults.headers.common["Content-Type"] = "application/json";
		//TODO: how to fix?
		return options?.schema
			? options.schema.parse(response.data)
			: (undefined as ResultType);
	} catch (error) {
		if (isAxiosError(error))
			throw new FetchError(error.status, error.message ?? error.code);
		if (error instanceof ZodError) throw new FetchError(400, error.message);
		throw new FetchError();
	}
};
