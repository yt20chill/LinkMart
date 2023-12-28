import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ZodError, ZodType } from "zod";
import { ErrorResponseDto } from "../schemas/responseSchema";
import { isObjOfType } from "./utils";

/**
 *
 * @param signIn boolean: true = signIn, false = signOut
 * @returns signIn = true: set common authorization header with token from localStorage
 * @returns signIn = false: delete common authorization header
 */
export const setCommonAuthorizationHeader = (signIn = true): void => {
	signIn
		? (axios.defaults.headers.common["Authorization"] = localStorage.getItem(
				"access_token"
		  )
				? `Bearer ${localStorage.getItem("access_token")}`
				: undefined)
		: delete axios.defaults.headers.common["Authorization"];
};

const setCommonContentTypeHeader = (set = true) => {
	if (set) axios.defaults.headers.common["Content-Type"] = "application/json";
	else delete axios.defaults.headers.common["Content-Type"];
};

const axiosInit = () => {
	setCommonContentTypeHeader();
	setCommonAuthorizationHeader();
	axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
	axios.defaults.timeout = 5000;
};

axiosInit();

type ApiMethod = "get" | "post" | "put" | "delete";
type AxiosWrapperReturnType<ResultType, OptionsType> = Promise<
	OptionsType extends {
		schema: ZodType<ResultType>;
	}
		? ResultType
		: undefined
>;

type AxiosWrapperOptions<PayloadType> = Partial<{
	method: ApiMethod;
	data: PayloadType;
	params: URLSearchParams | Record<string, string | number>;
}>;

type AxiosWrapperSchemaOptions<PayloadType, ResultType> =
	AxiosWrapperOptions<PayloadType> & { schema: ZodType<ResultType> };

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
		| AxiosWrapperOptions<PayloadType>
		| AxiosWrapperSchemaOptions<PayloadType, ResultType>
): /*Promise<ResultType>*/ AxiosWrapperReturnType<
	ResultType,
	typeof options
> => {
	try {
		const method = options?.method ?? "get";
		const isFormData = options?.data instanceof FormData;
		if (isFormData) setCommonContentTypeHeader(false);
		const response = await axios<ResultType>({
			method,
			url,
			data: options?.data,
			params: options?.params,
		});
		if (isFormData) setCommonContentTypeHeader();
		if (
			isObjOfType<AxiosWrapperSchemaOptions<PayloadType, ResultType>>(
				options,
				"schema"
			)
		)
			return options.schema.parse(response.data);
	} catch (error) {
		if (isAxiosError<ErrorResponseDto>(error)) {
			if (error.code === "ECONNABORTED") toast.error("Connection timeout");
			else if (error.response?.status === 401) toast.error("Permission denied");
			else if (error.response?.status !== 404)
				toast.error("Something went wrong");
			throw new FetchError(
				error.response?.status,
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
