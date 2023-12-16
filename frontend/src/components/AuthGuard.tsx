import { useQuery } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/hooks/useAuth";
import { FetchError } from "../lib/apiUtils";
import { getAuthAJAX } from "../services/api/authApi";
import { queryKey } from "../services/query.config";
import { RouteEnum, siteMap } from "../services/routes.config";
import { useAuthStore } from "../services/stores/authStore";
import Loading from "./ui/Loading";

const AuthGuard = () => {
	const authStore = useAuthStore((state) => state);
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
	if (isError && error instanceof FetchError && error.status === 401) {
		signOutHandler().catch((error) => {
			console.error(error);
		});
		authStore.reset;
	}
	if (isLoading) authStore.setIsAuthenticated(null);
	if (userInfo) authStore.login(userInfo.username, userInfo.role);
	if (authStore.isAuthenticated === null) return <Loading />;
	return authStore.isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to={siteMap(RouteEnum.SignIn)}
			state={{ from: location }}
			replace
		/>
	);
};

export default AuthGuard;
