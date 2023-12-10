import { useAuthStore } from "@/features/stores/authStore";
import { siteMap, RouteEnum } from "@/pages/routes.config";
import { AuthorizeLevel } from "@/types/authModels";
import { Link } from "react-router-dom";

export function Navbar() {
  const userInfo = useAuthStore((state) => state);
  return (
    <nav className="py-5 shadow-md border-b-8 border-orange-500 text-slate-500 bg-base-100">
      <div className="flex justify-between max-w-7xl mx-auto">
        {/* logo -> home page*/}
        <div className="flex gap-10 items-center">
          <Link to={siteMap(RouteEnum.Home)}>
            <div className="text-orange-300 text-3xl font-bold flex items-center">
              <span className="material-symbols-rounded text-5xl font-bold">
                shopping_cart_checkout
              </span>
              Link<b className="text-slate-300 font-normal">mart</b>
            </div>
          </Link>
          {/* nav_link_buttons */}
          <Link to={siteMap(RouteEnum.Requests)}>
            <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950 hover:scale-105 ">
              <span className="material-symbols-rounded mx-1">storefront</span>
              Explore
            </div>
          </Link>
          <Link to={siteMap(RouteEnum.UserRequests)}>
            <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950 hover:scale-105">
              {" "}
              <span className="material-symbols-rounded mx-1 ">
                receipt_long
              </span>
              Request
            </div>
          </Link>
          <Link to={siteMap(RouteEnum.UserOrder)}>
            <div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950 hover:scale-105">
              {" "}
              <span className="material-symbols-rounded mx-1">all_inbox</span>
              Order
            </div>
          </Link>
        </div>
        {/* nav_login_info */}
        <div className="flex gap-10 items-center">
          {!userInfo.isAuthenticated ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost rounded-btn"
                >
                  <span className="material-symbols-rounded mx-1">
                    account_circle
                  </span>
                  {userInfo.username}
                </div>
                <div
                  tabIndex={0}
                  className="menu dropdown-content z-[1] shadow bg-base-100/50 backdrop-blur-lg rounded-box w-52 mt-1"
                >
                  <Link to={siteMap(RouteEnum.Profile)}>
                    <div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950">
                      <span className="material-symbols-rounded mx-1">
                        person
                      </span>
                      Profile
                    </div>
                  </Link>
                  {userInfo.role === AuthorizeLevel.PROVIDER && (
                    <Link to={siteMap(RouteEnum.ProviderProfile)}>
                      <div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950">
                        <span className="material-symbols-rounded mx-1">
                          person
                        </span>
                        Provider
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            //Should be a dropdown list
            <Link to={siteMap(RouteEnum.SignIn)}>
              <div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-orange-500 hover:text-orange-950">
                <span className="material-symbols-rounded mx-1">login</span>
                Sign in
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
