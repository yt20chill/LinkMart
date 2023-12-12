import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import { routeConfigArray } from "./services/routes.config";

function App() {
	return (
		<>
			<AnimatedBG />
			<Navbar />
			<ToastContainer
				position="top-center"
				autoClose={2000}
				closeOnClick
				pauseOnHover
				pauseOnFocusLoss={false}
				theme="light"
				limit={1}
			/>
			<Routes>
				{routeConfigArray.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}
			</Routes>
		</>
	);
}

export default App;
