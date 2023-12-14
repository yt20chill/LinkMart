import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ZodError, ZodType } from "zod";
import { ErrorResponseDto } from "../schemas/responseSchema";
import { isObjOfType } from "./utils";

const setCommonContentTypeHeaders = (set = true) => {
	return set
		? (axios.defaults.headers.common["Content-Type"] = "application/json")
		: delete axios.defaults.headers.common["Content-Type"];
};
setCommonContentTypeHeaders();
axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
// TODO: handle login and logout !important
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
	? `Bearer ${localStorage.getItem("token")}`
	: undefined;

type ApiMethod = "get" | "post" | "put" | "delete";
type AxiosWrapperReturnType<ResultType, OptionsType> = Promise<
	OptionsType extends {
		schema: ZodType<ResultType>;
	}
		? ResultType
		: undefined
>;

type AxiosWrapperOptionsType<PayloadType> = Partial<{
	method: ApiMethod;
	data: PayloadType;
	params: URLSearchParams | Record<string, string | number>;
}>;

type RequiredSchemaOptionsType<PayloadType, ResultType> =
	AxiosWrapperOptionsType<PayloadType> & { schema: ZodType<ResultType> };

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
	options?:
		| AxiosWrapperOptionsType<PayloadType>
		| RequiredSchemaOptionsType<PayloadType, ResultType>
): /*Promise<ResultType>*/ AxiosWrapperReturnType<
	ResultType,
	typeof options
> => {
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
		if (
			options &&
			isObjOfType<RequiredSchemaOptionsType<PayloadType, ResultType>>(
				options,
				"schema"
			)
		)
			return options.schema.parse(response.data);
	} catch (error) {
		toast.error("Something went wrong");
		if (isAxiosError<ErrorResponseDto>(error)) {
			throw new FetchError(
				error.status,
				error.response?.data.message ?? error.code ?? error.message
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
