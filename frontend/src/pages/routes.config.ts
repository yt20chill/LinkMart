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

export const routeConfig: TRouteConfig[] = [
	{
		name: "home",
		path: "/",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: HomePage,
	},
	{
		name: "signUp",
		path: "/sign-up",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignUpPage,
	},
	{
		name: "signIn",
		path: "/sign-in",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: SignInPage,
	},
	{
		name: "requests",
		path: "/requests",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: RequestsPage,
	},
	{
		name: "profile",
		path: "/user/profile",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProfilePage,
	},
	{
		// request management
		name: "userRequests",
		path: "/user/requests",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserRequestsPage,
	},

	{
		// providers or other users to see
		name: "requestDetail",
		path: "/request-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: RequestDetailsPage,
	},
	{
		name: "userOrder",
		path: "/order",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserOrderPage,
	},
	{
		name: "orderDetail",
		path: "/order-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: OrderDetailsPage,
	},
	{
		name: "Provider Registration",
		path: "/provider/register",
		authorizeLevel: AuthorizeLevel.USER,
		component: ProviderRegisterPage,
	},
	{
		name: "profile",
		path: "provider/profile",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: ProviderProfilePage,
	},
	{
		// offer management
		name: "myOffer",
		path: "/offer",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferPage,
	},
	{
		name: "offerDetail",
		path: "/offer-detail/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferDetailsPage,
	},
	{
		name: "task",
		path: "/task",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskPage,
	},
	{
		name: "taskDetail",
		path: "/task-detail/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskDetailsPage,
	},
	{
		name: "dashboard",
		path: "/dashboard",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: DashboardPage,
	},
	{
		name: "adminSignIn",
		path: "/admin/sign-in",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminSignInPage,
	},
	{
		name: "task",
		path: "/admin/task",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTasksPage,
	},
	{
		name: "taskDetail",
		path: "/admin/task-detail/:id",
		authorizeLevel: AuthorizeLevel.ADMIN,
		component: AdminTaskDetailsPage,
	},
	{
		name: "NotFound",
		path: "*",
		authorizeLevel: AuthorizeLevel.PUBLIC,
		component: NotFoundPage,
	},
];
