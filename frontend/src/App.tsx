import { Route, Routes } from "react-router-dom";
import { routeConfigArray } from "./pages/routes.config";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
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
