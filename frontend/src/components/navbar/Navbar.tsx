import { RouteEnum, siteMap } from "@/services/routes.config";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { Link } from "react-router-dom";
import { ButtonWithIcon } from "../button/ButtonWithIcon";

export function Navbar() {
  const { isAuthenticated, role, username } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    role: state.role,
    username: state.username,
  }));
  return (
    <nav className="py-5 shadow-md border-b-8 border-rose-400 text-slate-500 bg-base-100">
      {/* nav_responsive */}
      <div className="max-md:flex md:hidden">
        <Link to={siteMap(RouteEnum.Home)}>
          <div className="text-rose-400 text-3xl font-bold flex justify-center items-center">
            <span className="material-symbols-rounded text-5xl font-bold">
              shopping_cart_checkout
            </span>
            Link<b className="text-slate-300 font-normal">mart</b>
          </div>
        </Link>
      </div>
      {/* nav_desktop */}
      <div className="flex justify-between max-w-7xl max-xl:px-2 mx-auto max-md:hidden">
        {/* logo -> home page*/}
        <div className="flex gap-10 items-center">
          <Link to={siteMap(RouteEnum.Home)}>
            <div className="text-rose-400 text-3xl font-bold flex items-center">
              <span className="material-symbols-rounded text-5xl font-bold">
                shopping_cart_checkout
              </span>
              Link<b className="text-slate-300 font-normal">mart</b>
            </div>
          </Link>
          {/* nav_link_buttons */}
          <ButtonWithIcon
            linkTo={RouteEnum.Requests}
            icon="storefront"
            label="Explore"
          />
          <ButtonWithIcon
            linkTo={RouteEnum.UserRequests}
            icon="receipt_long"
            label="Request"
          />
          <ButtonWithIcon
            linkTo={RouteEnum.UserOrder}
            icon="all_inbox"
            label="Order"
          />
        </div>
        {/* nav_login_info */}
        <div className="flex gap-10 items-center">
          {isAuthenticated ? (
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
                  {username}
                </div>
                <div
                  tabIndex={0}
                  className="menu dropdown-content z-[1] shadow bg-base-100/50 backdrop-blur-lg rounded-box w-52 mt-1"
                >
                  <ButtonWithIcon
                    linkTo={RouteEnum.Profile}
                    icon="person"
                    label="Profile"
                  />
                  {role === AuthorizeLevels.PROVIDER && (
                    <ButtonWithIcon
                      linkTo={RouteEnum.Profile}
                      icon="person"
                      label="Provider"
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            //Should be a dropdown list
            <ButtonWithIcon
              linkTo={RouteEnum.SignIn}
              icon="login"
              label="Sign in"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
