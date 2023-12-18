import { RouteEnum, siteMap } from "@/services/routes.config";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { useAuth } from "../../features/hooks/useAuth";
import { ButtonWithIcon } from "../button/ButtonWithIcon";

export function Navbar() {
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
		signOutHandler().catch(() => toast.error("Something went wrong"));
	};
	return (
		<nav className="py-5 shadow-md border-b-8 border-primary-500 text-slate-500 bg-base-100">
			{/* nav_responsive */}
			<div className="max-md:flex md:hidden justify-center">
				<Link to={siteMap(RouteEnum.Home)} className="w-1/3">
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
									<span className="material-symbols-rounded mx-1">
										account_circle
									</span>
									{username}
								</div>
								<div
									tabIndex={0}
									className="menu dropdown-content z-[1] shadow bg-base-100/50 backdrop-blur-lg rounded-box w-52 mt-1"
								>
									{role === AuthorizeLevels.PROVIDER && (
										<ButtonWithIcon
											linkTo={RouteEnum.ProviderProfile}
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
	);
}
