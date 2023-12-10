import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/navbar/Navbar";
import { routeConfigArray } from "./pages/routes.config";
import { AnimatedBG } from "./features/animatedBackground/AnimatedBG";

function App() {
  return (
    <>
      <AnimatedBG />
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss={false}
        theme="light"
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
