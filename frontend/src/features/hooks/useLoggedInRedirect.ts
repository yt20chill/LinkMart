import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";

const useLoggedInRedirect = () => {
	const isAuthenticated = useAuthStore(
		useShallow((state) => state.isAuthenticated)
	);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) navigate(siteMap(RouteEnum.Requests));
	}, [isAuthenticated, navigate]);
};

export { useLoggedInRedirect };
