import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import { routeConfigArray } from "./pages/routes.config";

function App() {
	return (
		<>
			<Navbar />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				closeOnClick
				pauseOnHover
				theme="light"
			/>
			<div className=" text-5xl font-bold text-red">Header</div>
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
