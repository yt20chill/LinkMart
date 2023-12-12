import { QueryClient } from "react-query";
import { FetchError } from "../lib/apiUtils";

export const queryKey = Object.freeze({
	REQUEST: "request",
	OFFER: "offer",
	ORDER: "order",
	AUTH: "auth",
});

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

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				return (
					(error instanceof FetchError && error.status === 500) ||
					failureCount > 2
				);
			},
		},
	},
});
