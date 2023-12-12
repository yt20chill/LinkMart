import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ZodError, ZodType } from "zod";

export const queryKey = Object.freeze({
	REQUEST: "request",
	OFFER: "offer",
	ORDER: "order",
	AUTH: "auth",
});

const setCommonContentTypeHeaders = (set = true) => {
	return set
		? (axios.defaults.headers.common["Content-Type"] = "application/json")
		: delete axios.defaults.headers.common["Content-Type"];
};
setCommonContentTypeHeaders();
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.headers.common["Authorization"] =
	`Bearer ${localStorage.getItem("token")}` ?? undefined;

export const authApiRoutes = Object.freeze({
	SIGN_IN: `/login`,
	SIGN_UP: `/signup`,
	GET_AUTH: `/api/user`,
});

export const requestApiRoutes = Object.freeze({
	CATEGORY: `/category`,
	LOCATION: `/location`,
	REQUEST: `/request`,
	IMAGE: `/request/image`,
});

type ApiMethod = "get" | "post" | "put" | "delete";
type AxiosWrapperReturnType<ResultType, OptionsType> = Promise<
	OptionsType extends {
		schema: ZodType<ResultType>;
	}
		? ResultType
		: void
>;

export class FetchError extends Error {
	constructor(
		public readonly status: number = 500,
		public readonly message: string = "Something went wrong"
	) {
		super(message);
		Object.setPrototypeOf(this, FetchError.prototype);
	}
}

/**
 * <PayloadType, ResultType>
 * Schema must be provided if ResultType is not void
 * @param url
 * @param options
 * @returns Promise<ResultType> after parsing schema if provided
 */
export const axiosWrapper = async <PayloadType = void, ResultType = void>(
	url: string,
	options?: {
		method?: ApiMethod;
		data?: PayloadType;
		schema?: ZodType<ResultType>;
		params?: URLSearchParams | Record<string, string | number>;
	}
): Promise<ResultType> /*AxiosWrapperReturnType<ResultType, typeof options> */ => {
	try {
		const method = options?.method ?? "get";
		const isFormData = options?.data instanceof FormData;
		if (isFormData) setCommonContentTypeHeaders(false);
		const response = await axios<ResultType>({
			method,
			url,
			data: options?.data,
			params: options?.params,
		});
		if (isFormData) setCommonContentTypeHeaders();
		//TODO: how to fix?
		return options?.schema
			? options.schema.parse(response.data)
			: (undefined as ResultType);
	} catch (error) {
		toast.error("Something went wrong");
		if (isAxiosError(error)) {
			console.error(error);
			throw new FetchError(
				error.status,
				error.response?.data.message ?? error.code
			);
		}
		if (error instanceof ZodError)
			throw new FetchError(
				400,
				JSON.stringify({
					path: error.errors[0].path,
					message: error.errors[0].message,
				})
			);
		throw new FetchError();
	}
};
