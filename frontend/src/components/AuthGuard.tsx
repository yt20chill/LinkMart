import { useEffect } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuth } from "../features/hooks/useAuth";
import { FetchError } from "../lib/apiUtils";
import { getAuthAJAX } from "../services/api/authApi";
import { queryKey } from "../services/query.config";
import { RouteEnum, siteMap } from "../services/routes.config";
import { useAuthStore } from "../services/stores/authStore";
import { AuthorizeLevels } from "../types/authModels";
import Loading from "./ui/Loading";

type AuthGuardProps = {
	authorizeLevel?: AuthorizeLevels;
};

const AuthGuard = ({
	authorizeLevel = AuthorizeLevels.USER,
}: AuthGuardProps) => {
	const authStore = useAuthStore(useShallow((state) => state));
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
	const location = useLocation();
	const { signOutHandler } = useAuth();

	useEffect(() => {
		if (isError && error instanceof FetchError && error.status === 401) {
			signOutHandler().catch((error) => console.error(error));
			authStore.reset();
		} else if (isLoading) authStore.setIsAuthenticated(null);
		else if (userInfo) authStore.login(userInfo.username, userInfo.role);
	}, [authStore, isError, error, isLoading, userInfo, signOutHandler]);
	if (authStore.isAuthenticated === null) return <Loading />;
	// if not logged in
	if (authStore.isAuthenticated === false)
		return (
			<Navigate
				to={siteMap(RouteEnum.SignIn)}
				state={{ from: location }}
				replace
			/>
		);
	// if user info validated but not authorized
	else if (authStore.isAuthenticated && authStore.role < authorizeLevel)
		return <Navigate to={siteMap(RouteEnum.Home)} replace />;
	// if user info validated and authorized
	return <Outlet />;
};

export default AuthGuard;
