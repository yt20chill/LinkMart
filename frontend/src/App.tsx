import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import RoutesByRole from "./components/routes/RoutesByRole";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import { enumToMap } from "./lib/formattingUtils";
import { AuthorizeLevels } from "./types/authModels";

function App() {
	return (
		<div className="min-w-[360px]">
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
			{Array.from(enumToMap(AuthorizeLevels).values()).map((level) => (
				<RoutesByRole key={level} authorizeLevel={level as AuthorizeLevels} />
			))}
		</div>
	);
}

export default App;
