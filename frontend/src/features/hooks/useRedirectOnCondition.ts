import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteEnum, siteMap } from "../../services/routes.config";

const useRedirectOnCondition = (
	condition: boolean,
	redirectPath: RouteEnum = RouteEnum.Home,
	message: string = "Broken URL, redirecting..."
) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (condition) {
			toast.error(message);
			const timeoutId = setTimeout(
				() => navigate(siteMap(redirectPath), { replace: true }),
				3000
			);
			return clearTimeout(timeoutId);
		}
	}, [condition, navigate, message, redirectPath]);
};

export default useRedirectOnCondition;
