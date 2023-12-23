import { AxiosError } from "axios";
import { QueryClient } from "react-query";
import { FetchError } from "../lib/apiUtils";

export const queryKey = Object.freeze({
	REQUEST: "request",
	OFFER: "offer",
	ORDER: "order",
	AUTH: "auth",
	USER: "user",
	PROVIDER: "provider",
});

const errorCodeAbandonRetry = [400, 401, 403, 404, 500];

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				// if failureCount > 3, always return false
				return failureCount > 3
					? false
					: // else check network error
					  error instanceof AxiosError &&
							error.code === "ERR_NETWORK" &&
							!(
								error instanceof FetchError &&
								errorCodeAbandonRetry.includes(error.status)
							);
			},
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});
