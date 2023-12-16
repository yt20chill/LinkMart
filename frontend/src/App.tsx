import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./components/AuthGuard";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import {
	authorizedLevelMap,
	authorizedLevelToPrefix,
	routeConfigArray,
} from "./services/routes.config";
import { AuthorizeLevels } from "./types/authModels";

function App() {
	return (
		<div className="min-w-[360px] min-h-screen flex flex-col">
			<AnimatedBG />
			<Navbar />
			<ToastContainer
				position="top-center"
				autoClose={500}
				closeOnClick
				pauseOnHover
				pauseOnFocusLoss={false}
				theme="light"
				limit={5}
			/>
			<Routes>
				{Array.from(authorizedLevelMap.keys()).map((level) =>
					// <RoutesByRole key={level} authorizeLevel={level} />
					level > AuthorizeLevels.PUBLIC ? (
						<Route
							key={level}
							path={authorizedLevelToPrefix(level)}
							element={<AuthGuard authorizeLevel={level} />}
						>
							{routeConfigArray
								.filter((route) => route.authorizeLevel === level)
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
							.filter((route) => route.authorizeLevel === level)
							.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={<route.component />}
								/>
							))
					)
				)}
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
