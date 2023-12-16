import { RouteEnum, siteMap } from "@/services/routes.config";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { Link } from "react-router-dom";

export function Navbar() {
	const { isAuthenticated, role, username } = useAuthStore((state) => ({
		isAuthenticated: state.isAuthenticated,
		role: state.role,
		username: state.username,
	}));
	return (
		<nav className="py-5 shadow-md border-b-8 border-orange-600 text-slate-500 bg-base-100">
			{/* nav_responsive */}
			<div className="max-md:flex md:hidden">
				<Link to={siteMap(RouteEnum.Home)}>
					<div className="text-orange-400 text-3xl font-bold flex justify-center items-center">
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
						<div className="text-orange-400 text-3xl font-bold flex items-center">
							<span className="material-symbols-rounded text-5xl font-bold">
								shopping_cart_checkout
							</span>
							Link<b className="text-slate-300 font-normal">mart</b>
						</div>
					</Link>
					{/* nav_link_buttons */}
					<Link to={siteMap(RouteEnum.Requests)}>
						<div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950 hover:scale-105 ">
							<span className="material-symbols-rounded mx-1">storefront</span>
							Explore
						</div>
					</Link>
					<Link to={siteMap(RouteEnum.UserRequests)}>
						<div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950 hover:scale-105">
							{" "}
							<span className="material-symbols-rounded mx-1 ">
								receipt_long
							</span>
							Request
						</div>
					</Link>
					<Link to={siteMap(RouteEnum.UserOrder)}>
						<div className="flex items-center p-3 rounded-lg hover:bg-slate-200 transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950 hover:scale-105">
							{" "}
							<span className="material-symbols-rounded mx-1">all_inbox</span>
							Order
						</div>
					</Link>
				</div>
				{/* nav_login_info */}
				<div className="flex gap-10 items-center">
					{!isAuthenticated ? (
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
									<Link to={siteMap(RouteEnum.Profile)}>
										<div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950">
											<span className="material-symbols-rounded mx-1">
												person
											</span>
											Profile
										</div>
									</Link>
									{role === AuthorizeLevels.PROVIDER && (
										<Link to={siteMap(RouteEnum.ProviderProfile)}>
											<div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950">
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
							<div className="flex items-center p-3 rounded-lg hover:bg-base-100/75 hover:shadow transition-all duration-300 [&>span]:hover:text-amber-500 hover:text-amber-950">
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
