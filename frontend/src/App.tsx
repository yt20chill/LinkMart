import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import RoutesByRole from "./components/routes/RoutesByRole";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import { authorizedLevelMap } from "./services/routes.config";
import { AuthorizeLevels } from "./types/authModels";
import { Footer } from "./components/footer/Footer";

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
      {Array.from(authorizedLevelMap.keys()).map((level) => (
        <RoutesByRole key={level} authorizeLevel={level as AuthorizeLevels} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
