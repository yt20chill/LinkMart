import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { FetchError, setCommonAuthorizationHeader } from "../../lib/apiUtils";
import { getAuthAJAX } from "../../services/api/authApi";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import { useNavigateToPreviousPage } from "./useNavigateToPreviousPage";

const useAuth = () => {
	const navigatePrev = useNavigateToPreviousPage();
	const navigate = useNavigate();
	const authStore = useAuthStore(useShallow((state) => state));

	const {
		data: userInfo,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: getAuthAJAX,
		enabled: !!authStore.isAuthenticated,
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
		navigate(siteMap(RouteEnum.Home));
	}, [navigate, authStore]);

	//FIXME: did not get the latest userInfo?
	const updateAuthStore = useCallback((): void => {
		if (isLoading) return authStore.setIsAuthenticated(null);
		else if (isError && error instanceof FetchError && error.status === 401) {
			signOutHandler();
			return authStore.reset();
		} else if (userInfo) {
			return authStore.login(userInfo.username, userInfo.role);
		}
	}, [authStore, error, isError, isLoading, userInfo, signOutHandler]);

	return { signInHandler, signOutHandler, updateAuthStore };
};

export { useAuth };
