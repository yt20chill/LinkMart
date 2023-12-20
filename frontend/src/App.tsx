import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./components/AuthGuard";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import ProviderLayout from "./components/navbar/ProviderNavTab";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import { useAuth } from "./features/hooks/useAuth";
import { NotFoundPage } from "./pages/public";
import {
	authorizedLevelToPrefix,
	routeConfigArray,
} from "./services/routes.config";
import { AuthorizeLevels } from "./types/authModels";

function App() {
	const { updateAuthStore } = useAuth();

	// updateAuthStore after mount
	useEffect(() => {
		updateAuthStore();
	}, [updateAuthStore]);

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
				(
				<Route
					path={authorizedLevelToPrefix(AuthorizeLevels.ADMIN)}
					element={<AuthGuard authorizeLevel={AuthorizeLevels.ADMIN} />}
				>
					{routeConfigArray
						.filter((route) => route.authorizeLevel === AuthorizeLevels.ADMIN)
						.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<route.component />}
							/>
						))}
				</Route>
				<Route element={<ProviderLayout />}>
					<Route
						path={authorizedLevelToPrefix(AuthorizeLevels.PROVIDER)}
						element={<AuthGuard authorizeLevel={AuthorizeLevels.PROVIDER} />}
					>
						{routeConfigArray
							.filter(
								(route) => route.authorizeLevel === AuthorizeLevels.PROVIDER
							)
							.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={<route.component />}
								/>
							))}
					</Route>
				</Route>
				<Route
					path={authorizedLevelToPrefix(AuthorizeLevels.USER)}
					element={<AuthGuard authorizeLevel={AuthorizeLevels.USER} />}
				>
					{routeConfigArray
						.filter((route) => route.authorizeLevel === AuthorizeLevels.USER)
						.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<route.component />}
							/>
						))}
				</Route>
				{routeConfigArray
					.filter((route) => route.authorizeLevel === AuthorizeLevels.PUBLIC)
					.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					))}
				)
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<div className="my-6"></div>
			<Footer />
		</div>
	);
}

export default App;
