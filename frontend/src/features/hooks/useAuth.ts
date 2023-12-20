import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { FetchError, setCommonAuthorizationHeader } from "../../lib/apiUtils";
import { getAuthAJAX } from "../../services/api/authApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import { useNavigateToPreviousPage } from "./useNavigateToPreviousPage";

const useAuth = () => {
	const navigatePrev = useNavigateToPreviousPage();
	const navigate = useNavigate();
	const authStore = useAuthStore(useShallow((state) => state));
	const queryClient = useQueryClient();
	const {
		data: userInfo,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [queryKey.AUTH],
		queryFn: getAuthAJAX,
		enabled: !!window.localStorage.getItem("access_token"),
	});

	const signInHandler = useCallback(
		(jwt: string | undefined): void => {
			if (!jwt) throw new FetchError(401, "Invalid token");
			window.localStorage.setItem("access_token", jwt);
			setCommonAuthorizationHeader();
			authStore.setIsAuthenticated(true);
			navigatePrev();
		},
		[navigatePrev, authStore]
	);

	const signOutHandler = useCallback((): void => {
		window.localStorage.removeItem("access_token");
		setCommonAuthorizationHeader(false);
		authStore.reset();
		// remove all cache on logout
		queryClient.removeQueries();
		navigate(siteMap(RouteEnum.Home));
	}, [navigate, authStore, queryClient]);

	const updateAuthStore = useCallback((): void => {
		if (isError) {
			if (error instanceof FetchError && error.status === 401) {
				signOutHandler();
				authStore.reset();
			}
			console.error(error);
			navigate(siteMap(RouteEnum.Home));
		}
		if (isLoading) return authStore.setIsAuthenticated(null);
		else if (userInfo) {
			return authStore.login(userInfo.username, userInfo.role);
		}
	}, [
		authStore,
		error,
		isError,
		isLoading,
		userInfo,
		signOutHandler,
		navigate,
	]);

	return { signInHandler, signOutHandler, updateAuthStore };
};

export { useAuth };
