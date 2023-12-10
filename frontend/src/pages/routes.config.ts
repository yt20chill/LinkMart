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
import PostRequestPage from "./user/PostRequestPage";

interface TRouteConfig {
	name: string;
	path: string;
	component: JSX.ElementType;
	authorizeLevel: AuthorizeLevel;
}

export enum RouteEnum {
	Home,
	SignUp,
	SignIn,
	Requests,
	Profile,
	UserRequests,
	PostRequest,
	RequestDetail,
	UserOrder,
	OrderDetail,
	ProviderRegister,
	ProviderProfile,
	MyOffer,
	OfferDetail,
	Task,
	TaskDetail,
	Dashboard,
	AdminSignIn,
	AdminTask,
	AdminTaskDetail,
	NotFound,
}

const routeConfigMap = new Map<RouteEnum, TRouteConfig>();
routeConfigMap
	.set(RouteEnum.Home, {
		name: "home",
		path: "/",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: HomePage,
	})
	.set(RouteEnum.SignUp, {
		name: "Sign Up",
		path: "/sign-up",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignUpPage,
	})
	.set(RouteEnum.SignIn, {
		name: "Sign In",
		path: "/sign-in",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignInPage,
	})
	.set(RouteEnum.Requests, {
		name: "requests",
		path: "/requests",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: RequestsPage,
	})
	.set(RouteEnum.Profile, {
		name: "profile",
		path: "/user/profile",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProfilePage,
	})
	.set(RouteEnum.UserRequests, {
		// request management
		name: "My Requests",
		path: "/user/requests",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserRequestsPage,
	})
	.set(RouteEnum.RequestDetail, {
		// providers or other users to see
		name: "Request Detail",
		path: "/request-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: RequestDetailsPage,
	})
	.set(RouteEnum.PostRequest, {
		name: "New Request",
		path: "/request/post",
		authorizeLevel: AuthorizeLevel.USER,
		component: PostRequestPage,
	})
	.set(RouteEnum.UserOrder, {
		name: "My Order",
		path: "/order",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserOrderPage,
	})
	.set(RouteEnum.OrderDetail, {
		name: "Order Detail",
		path: "/order-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: OrderDetailsPage,
	})
	.set(RouteEnum.ProviderRegister, {
		name: "Provider Registration",
		path: "/provider/register",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProviderRegisterPage,
	})
	.set(RouteEnum.ProviderProfile, {
		name: "Profile",
		path: "/provider/profile",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: ProviderProfilePage,
	})
	.set(RouteEnum.MyOffer, {
		// offer management
		name: "My Offer",
		path: "/offer",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferPage,
	})
	.set(RouteEnum.OfferDetail, {
		name: "Offer Details",
		path: "/offer-details/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferDetailsPage,
	})
	.set(RouteEnum.Task, {
		name: "task",
		path: "/task",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskPage,
	})
	.set(RouteEnum.TaskDetail, {
		name: "Task Details",
		path: "/task-details/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskDetailsPage,
	})
	.set(RouteEnum.Dashboard, {
		name: "dashboard",
		path: "/dashboard",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: DashboardPage,
	})
	.set(RouteEnum.AdminSignIn, {
		name: "adminSignIn",
		path: "/admin/sign-in",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminSignInPage,
	})
	.set(RouteEnum.Task, {
		name: "task",
		path: "/admin/task",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTasksPage,
	})
	.set(RouteEnum.TaskDetail, {
		name: "taskDetail",
		path: "/admin/task-detail/:id",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTaskDetailsPage,
	})
	.set(RouteEnum.NotFound, {
		name: "NotFound",
		path: "*",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: NotFoundPage,
	});

export const routeConfigArray = Object.freeze(
	Array.from(routeConfigMap.values())
);

export const siteMap = (route: RouteEnum): string => {
	return routeConfigMap.get(route)?.path ?? "/";
};

export default Object.freeze(routeConfigMap);
