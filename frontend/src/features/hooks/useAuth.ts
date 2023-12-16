import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { FetchError, setCommonAuthorizationHeader } from "../../lib/apiUtils";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useNavigateToPreviousPage } from "./useNavigateToPreviousPage";

const useAuth = () => {
	const queryClient = useQueryClient();
	const navigatePrev = useNavigateToPreviousPage();
	const navigate = useNavigate();
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

	return { signInHandler, signOutHandler };
};

export { useAuth };
