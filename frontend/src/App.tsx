import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./features/routes.config";

function App() {
	return (
		<>
			<div className=" text-5xl font-bold text-red">Header</div>
			<Routes>
				{routeConfig.map((route) => (
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
