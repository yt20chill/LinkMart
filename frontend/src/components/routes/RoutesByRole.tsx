import { Route, Routes } from "react-router-dom";
import {
	authorizedLevelMap,
	routeConfigArray,
} from "../../services/routes.config";
import { AuthorizeLevels } from "../../types/authModels";
import AuthGuard from "../AuthGuard";

type RoutesByRoleProps = {
	authorizeLevel: AuthorizeLevels;
};

//TODO: Why this part cannot be factored out?
// const RoutesMapper = ({ authorizeLevel }: RoutesByRoleProps) => {
// 	return routeConfigArray
// 		.filter((route) => route.authorizeLevel === authorizeLevel)
// 		.map((route) => (
// 			<Route key={route.path} path={route.path} element={<route.component />} />
// 		));
// };

const RoutesByRole = ({ authorizeLevel }: RoutesByRoleProps) => {
	const level = authorizedLevelMap.get(authorizeLevel);
	const prefix =
		level === "PUBLIC" || level === undefined ? "/" : level.toLowerCase();
	return (
		<Routes>
			{authorizeLevel > AuthorizeLevels.PUBLIC ? (
				<Route
					path={prefix}
					element={<AuthGuard authorizeLevel={authorizeLevel} />}
				>
					{routeConfigArray
						.filter((route) => route.authorizeLevel === authorizeLevel)
						.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<route.component />}
							/>
						))}
				</Route>
			) : (
				// <RoutesMapper authorizeLevel={authorizeLevel} />
				routeConfigArray
					.filter((route) => route.authorizeLevel === authorizeLevel)
					.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					))
			)}
		</Routes>
	);
};

export default RoutesByRole;
