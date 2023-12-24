import { RouteEnum, siteMap } from "@/services/routes.config";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuth } from "../../features/hooks/useAuth";
import { ButtonWithIcon } from "../button/ButtonWithIcon";
import { IconCircleFrame } from "../frame/IconCircleFrame";
import { twMerge } from "tailwind-merge";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, role, username } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      role: state.role,
      username: state.username,
    }))
  );
  const { signOutHandler } = useAuth();
  const signOut = (e: MouseEvent) => {
    e.preventDefault();
    signOutHandler();
  };
  const [navIsShow, setNavIsShow] = useState(false);
  return (
    <>
      <nav className="py-5 shadow-md border-b-8 border-primary-400 text-slate-500 bg-base-100">
        {/* nav_responsive */}
        {/* nav_toggle_button */}
        <div className="max-md:grid grid-cols-3 md:hidden justify-center gap-2 px-3">
          <div className="">
            <div
              className="hover:bg-gray-200 inline-flex items-center p-2 rounded-full"
              onClick={() => setNavIsShow(!navIsShow)}
            >
              {navIsShow ? (
                <span className="material-symbols-rounded">close</span>
              ) : (
                <span className="material-symbols-rounded">menu</span>
              )}
            </div>
          </div>
          <Link to={siteMap(RouteEnum.Home)} className="w-full">
            <img
              src="/image/Linkmart@512.png"
              className="object-contain"
              title="Linkmart"
            />
          </Link>
        </div>

        {/* nav_desktop */}
        <div className="flex justify-between max-w-7xl max-xl:px-2 mx-auto max-md:hidden">
          {/* logo -> home page*/}
          <div className="flex gap-10 items-center">
            <Link to={siteMap(RouteEnum.Home)} className="max-w-[200px]">
              <img
                src="/image/Linkmart@512.png"
                title="Linkmart"
                className="object-contain"
              />
            </Link>
            {/* nav_link_buttons */}
            <ButtonWithIcon
              linkTo={RouteEnum.Requests}
              icon="storefront"
              label="Explore"
            />
            {isAuthenticated && (
              <>
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
              </>
            )}
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
                    <IconCircleFrame username={username!} />
                    <div className="font-normal flex justify-center items-center">
                      {username}
                      <span className="material-symbols-rounded text-[20px] ml-2">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="menu dropdown-content z-[1] shadow bg-base-100/50 backdrop-blur-lg rounded-box w-52 mt-1"
                  >
                    {role === AuthorizeLevels.PROVIDER && (
                      <ButtonWithIcon
                        linkTo={RouteEnum.Dashboard}
                        icon="local_mall"
                        label="Provider"
                      />
                    )}
                    <ButtonWithIcon
                      linkTo={RouteEnum.Profile}
                      icon="person"
                      label="Profile"
                    />
                    <ButtonWithIcon
                      icon="logout"
                      label="Sign Out"
                      onClick={signOut}
                    />
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
      {/* nav_responsive_menu */}
      <nav
        className={twMerge(
          "flex md:hidden fixed inset-0 h-screen z-50 overflow-hidden transition-all bg-slate-950/50",
          navIsShow ? "max-w-[2000px]" : "max-w-[0px]"
        )}
      >
        <div className="w-11/12 bg-base-100 min-h-screen">
          <div className="p-6 border-b-8 border-primary-400">
            {username ? (
              <>
                <IconCircleFrame username={username} />
                <div className="font-normal flex justify-center items-center">
                  {username}
                </div>
              </>
            ) : (
              <div className="flex">
                <ButtonWithIcon
                  onClick={() => {
                    setNavIsShow(false);
                    navigate(siteMap(RouteEnum.SignIn));
                  }}
                  icon="login"
                  label="Sign in"
                />
              </div>
            )}
          </div>
          <div className="p-6">
            <ButtonWithIcon
              onClick={() => {
                setNavIsShow(false);
                navigate(siteMap(RouteEnum.Requests));
              }}
              icon="storefront"
              label="Explore"
            />
            {isAuthenticated && (
              <>
                <ButtonWithIcon
                  onClick={() => {
                    setNavIsShow(false);
                    navigate(siteMap(RouteEnum.UserRequests));
                  }}
                  icon="receipt_long"
                  label="Request"
                />
                <ButtonWithIcon
                  onClick={() => {
                    setNavIsShow(false);
                    navigate(siteMap(RouteEnum.UserOrder));
                  }}
                  icon="all_inbox"
                  label="Order"
                />
              </>
            )}
          </div>
        </div>
        <div
          className="grow min-h-screen bg-slate-950/0 backdrop-blur-sm"
          onClick={() => {
            setNavIsShow(false);
          }}
        ></div>
      </nav>
    </>
  );
}
/*

					  <div className="flex gap-10 items-center">
					  {isAuthenticated ? (
						<>
						  <div className="dropdown dropdown-end">
							<div
							  tabIndex={0}
							  role="button"
							  className="btn btn-ghost rounded-btn"
							>

							</div>
							<div
							  tabIndex={0}
							  className="menu dropdown-content z-[1] shadow bg-base-100/50 backdrop-blur-lg rounded-box w-52 mt-1"
							>
							  {role === AuthorizeLevels.PROVIDER && (
								<ButtonWithIcon
								  linkTo={RouteEnum.Dashboard}
								  icon="local_mall"
								  label="Provider"
								/>
							  )}
							  <ButtonWithIcon
								linkTo={RouteEnum.Profile}
								icon="person"
								label="Profile"
							  />
							  <ButtonWithIcon
								icon="logout"
								label="Sign Out"
								onClick={signOut}
							  />
							</div>
						  </div>
						</>
					  ) : (
						<ButtonWithIcon
						  linkTo={RouteEnum.SignIn}
						  icon="login"
						  label="Sign in"
						/>
					  )}
					</div>
*/
