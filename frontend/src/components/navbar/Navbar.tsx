import { useAuthStore } from "@/features/stores/authStore";
import { siteMap, RouteEnum } from "@/pages/routes.config";
import { AuthorizeLevel } from "@/types/authModels";
import { Link } from "react-router-dom";

export function Navbar() {
  const userInfo = useAuthStore((state) => state);
  return (
    <nav className="flex justify-between p-5">
      {/* logo -> home page*/}
      <div className="flex gap-5">
        <Link to={siteMap(RouteEnum.Home)}>
          <div className="Logo">LOGO</div>
        </Link>
        {/* nav_link_buttons */}
        <Link to={siteMap(RouteEnum.Requests)}>
          <div className="">Explore</div>
        </Link>
        <Link to={siteMap(RouteEnum.UserRequests)}>
          <div className="">Request</div>
        </Link>
        <Link to={siteMap(RouteEnum.UserOrder)}>
          <div className="">Order</div>
        </Link>
      </div>
      {/* nav_login_info */}
      <div>
        {userInfo.isAuthenticated ? (
          <>
            <Link to={siteMap(RouteEnum.Profile)}>
              <div className="">Profile</div>
            </Link>
            {userInfo.role === AuthorizeLevel.PROVIDER && (
              <Link to={siteMap(RouteEnum.ProviderProfile)}>
                <div className="">Provider</div>
              </Link>
            )}
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
