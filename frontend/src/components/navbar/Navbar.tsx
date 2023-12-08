import { useAuthStore } from "@/features/stores/authStore";
import routesConfig, { RouteEnum } from "@/pages/routes.config";
import { Link } from "react-router-dom";

export function Navbar() {
  const userInfo = useAuthStore((state) => state);
  return (
    <nav className="flex justify-between p-5">
      {/* logo -> home page*/}
      <div className="flex gap-5">
        <Link to={routesConfig.get(RouteEnum.Home)?.path ?? "/"}>
          <div className="Logo">LOGO</div>
        </Link>
        {/* nav_link_buttons */}
        <Link to="/requests">
          <div className="">Explore</div>
        </Link>
        <Link to="/user/request">
          <div className="">Request</div>
        </Link>
        <Link to="/Order">
          <div className="">Order</div>
        </Link>
      </div>
      {/* nav_login_info */}
      <div>
        {userInfo.isAuthenticated ? (
          <>
            <Link to="/user/profile">
              <div className="">Profile</div>
            </Link>
            <Link to="/user/profile">
              <div className="">Profile</div>
            </Link>
          </>
        ) : (
          //Should be a dropdown list
          <Link to="/sign-in">
            <div className="">Sign-in</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
