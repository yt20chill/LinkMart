import { useAuthStore } from "@/features/stores/authStore";
import { siteMap, RouteEnum } from "@/pages/routes.config";
import { AuthorizeLevel } from "@/types/authModels";
import { Link } from "react-router-dom";

export function Navbar() {
  const userInfo = useAuthStore((state) => state);
  return (
    <nav className="flex justify-between px-8 py-5 shadow-md border-b-8 border-primary text-slate-500">
      {/* logo -> home page*/}
      <div className="flex gap-10 items-center">
        <Link to={siteMap(RouteEnum.Home)}>
          <div className="text-primary text-3xl font-bold flex items-center">
            <span className="material-symbols-rounded text-5xl font-bold">
              shopping_cart_checkout
            </span>
            Link<b className="text-slate-300 font-normal">mart</b>
          </div>
        </Link>
        {/* nav_link_buttons */}
        <Link to={siteMap(RouteEnum.Requests)}>
          <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition duration-300 [&>span]:hover:text-accent">
            <span className="material-symbols-rounded mx-1">storefront</span>
            Explore
          </div>
        </Link>
        <Link to={siteMap(RouteEnum.UserRequests)}>
          <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition duration-300 [&>span]:hover:text-accent">
            <span className="material-symbols-rounded mx-1 ">receipt_long</span>
            Request
          </div>
        </Link>
        <Link to={siteMap(RouteEnum.UserOrder)}>
          <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition duration-300 [&>span]:hover:text-accent">
            <span className="material-symbols-rounded mx-1">all_inbox</span>
            Order
          </div>
        </Link>
      </div>
      {/* nav_login_info */}
      <div className="flex gap-10 items-center">
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
