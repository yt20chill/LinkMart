import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
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
	const location = useLocation();

	// if not logged in
	if (
		!window.localStorage.getItem("access_token") ||
		authStore.isAuthenticated === false
	)
		return (
			<Navigate
				to={siteMap(RouteEnum.SignIn)}
				state={{ from: location }}
				replace
			/>
		);
	// if validating user info
	if (authStore.isAuthenticated === null) return <Loading />;
	// if user info validated but not authorized
	else if (authStore.isAuthenticated && authStore.role < authorizeLevel)
		return <Navigate to={siteMap(RouteEnum.Home)} replace />;
	// if user info validated and authorized
	return <Outlet />;
};

export default AuthGuard;
