import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";
import { routeConfigArray } from "./services/routes.config";

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
      <Routes>
        {routeConfigArray.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
