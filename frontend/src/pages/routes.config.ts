import { AdminSignInPage, AdminTaskDetailsPage, AdminTasksPage } from "./admin";
import {
	DashboardPage,
	OfferDetailsPage,
	OfferPage,
	ProviderProfilePage,
	TaskDetailsPage,
	TaskPage,
} from "./provider";
import {
	HomePage,
	NotFoundPage,
	RequestsPage,
	SignInPage,
	SignUpPage,
} from "./public";
import {
	OrderDetailsPage,
	ProfilePage,
	ProviderRegisterPage,
	RequestDetailsPage,
	UserOrderPage,
	UserRequestsPage,
} from "./user";

import { AuthorizeLevel } from "../types/authModels";

interface TRouteConfig {
	name: string;
	path: string;
	component: JSX.ElementType;
	authorizeLevel: AuthorizeLevel;
}

const routeConfigMap = new Map<string, TRouteConfig>();
routeConfigMap
	.set("home", {
		name: "home",
		path: "/",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: HomePage,
	})
	.set("signUp", {
		name: "Sign Up",
		path: "/sign-up",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignUpPage,
	})
	.set("signIn", {
		name: "Sign In",
		path: "/sign-in",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignInPage,
	})
	.set("requests", {
		name: "requests",
		path: "/requests",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: RequestsPage,
	})
	.set("profile", {
		name: "profile",
		path: "/user/profile",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProfilePage,
	})
	.set("userRequests", {
		// request management
		name: "My Requests",
		path: "/user/requests",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserRequestsPage,
	})
	.set("requestDetail", {
		// providers or other users to see
		name: "Request Detail",
		path: "/request-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: RequestDetailsPage,
	})
	.set("userOrder", {
		name: "My Order",
		path: "/order",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserOrderPage,
	})
	.set("orderDetail", {
		name: "Order Detail",
		path: "/order-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: OrderDetailsPage,
	})
	.set("providerRegister", {
		name: "Provider Registration",
		path: "/provider/register",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProviderRegisterPage,
	})
	.set("providerProfile", {
		name: "Profile",
		path: "provider/profile",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: ProviderProfilePage,
	})
	.set("myOffer", {
		// offer management
		name: "My Offer",
		path: "/offer",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferPage,
	})
	.set("offerDetail", {
		name: "Offer Details",
		path: "/offer-details/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferDetailsPage,
	})
	.set("task", {
		name: "task",
		path: "/task",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskPage,
	})
	.set("taskDetail", {
		name: "Task Details",
		path: "/task-details/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskDetailsPage,
	})
	.set("dashboard", {
		name: "dashboard",
		path: "/dashboard",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: DashboardPage,
	})
	.set("adminSignIn", {
		name: "adminSignIn",
		path: "/admin/sign-in",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminSignInPage,
	})
	.set("adminTask", {
		name: "task",
		path: "/admin/task",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTasksPage,
	})
	.set("adminTaskDetail", {
		name: "taskDetail",
		path: "/admin/task-detail/:id",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTaskDetailsPage,
	})
	.set("notFound", {
		name: "NotFound",
		path: "*",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: NotFoundPage,
	});

export const routeConfigArray = Object.freeze(
	Array.from(routeConfigMap.values())
);
export default Object.freeze(routeConfigMap);
