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
	const queryClient = useQueryClient();
	const navigatePrev = useNavigateToPreviousPage();
	const navigate = useNavigate();
	const {
		data: userInfo,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: queryKey.AUTH,
		queryFn: getAuthAJAX,
		enabled: !!window.localStorage.getItem("access_token"),
	});
	const authStore = useAuthStore(useShallow((state) => state));
	const signInHandler = useCallback(
		async (jwt: string | undefined): Promise<void> => {
			if (!jwt) throw new FetchError(401, "Invalid token");
			window.localStorage.setItem("access_token", jwt);
			setCommonAuthorizationHeader();
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
		[navigatePrev, queryClient]
	);

	const signOutHandler = useCallback(async (): Promise<void> => {
		window.localStorage.removeItem("access_token");
		setCommonAuthorizationHeader(false);
		await queryClient.invalidateQueries(queryKey.AUTH);
		navigate(siteMap(RouteEnum.Home));
	}, [navigate, queryClient]);

	const updateAuthStore = useCallback((): void => {
		if (isLoading) return authStore.setIsAuthenticated(null);
		else if (isError && error instanceof FetchError && error.status === 401) {
			signOutHandler().catch((error) => console.error(error));
			return authStore.reset();
		} else if (userInfo)
			return authStore.login(userInfo.username, userInfo.role);
	}, [authStore, error, isError, isLoading, userInfo, signOutHandler]);

	return { signInHandler, signOutHandler, updateAuthStore };
};

export { useAuth };
