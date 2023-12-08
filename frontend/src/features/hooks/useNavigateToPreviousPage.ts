import { useLocation, useNavigate } from "react-router-dom";
import routeConfigMap from "../../pages/routes.config";

type LocationState = {
	from: {
		pathname: string;
	};
};

/**
 *
 * @returns a function that navigates to the previous page or the requests page if the previous page is not available, or homepage of none of them are available
 * @example const navigatePrev = useNavigateToPreviousPage();
 * navigatePrev();
 */

export const useNavigateToPreviousPage = () => {
	const navigate = useNavigate();
	const locationState = useLocation().state as LocationState;

	return () =>
		navigate(
			locationState?.from.pathname ??
				routeConfigMap.get("requests")?.path ??
				"/"
		);
};
