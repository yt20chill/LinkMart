import { authStore } from "@/features/stores/authStore";
import { Link } from "react-router-dom";

export function Navbar() {
  const userInfo = authStore<AuthState>((state) => state);
  return (
    <nav>
      {/* logo -> home page*/}
      <Link to="/">
        <div className=""></div>
      </Link>
      {/* nav_buttons */}
      <Link to="/">
        <div className=""></div>
      </Link>
      <Link to="/">
        <div className=""></div>
      </Link>
      <Link to="/">
        <div className=""></div>
      </Link>
      <Link to="/">
        <div className=""></div>
      </Link>
      <Link to="/">
        <div className=""></div>
      </Link>
    </nav>
  );
}
