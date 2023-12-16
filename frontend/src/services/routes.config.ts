import { enumToMap } from "../lib/formattingUtils";
import {
	AdminSignInPage,
	AdminTaskDetailsPage,
	AdminTasksPage,
} from "../pages/admin";
import {
	DashboardPage,
	OfferDetailsPage,
	OfferPage,
	ProviderProfilePage,
	TaskDetailsPage,
	TaskPage,
} from "../pages/provider";
import {
	HomePage,
	RequestsPage,
	SignInPage,
	SignUpPage,
} from "../pages/public";
import {
	OrderDetailsPage,
	ProfilePage,
	ProviderRegisterPage,
	RequestDetailsPage,
	UserOrderPage,
	UserRequestsPage,
} from "../pages/user";

import PostRequestPage from "../pages/user/PostRequestPage";
import { AuthorizeLevels } from "../types/authModels";

interface TRouteConfig {
	name: string;
	path: string;
	component: JSX.ElementType;
	authorizeLevel: AuthorizeLevels;
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
		path: "",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: HomePage,
	})
	.set(RouteEnum.SignUp, {
		name: "Sign Up",
		path: "sign-up",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: SignUpPage,
	})
	.set(RouteEnum.SignIn, {
		name: "Sign In",
		path: "sign-in",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: SignInPage,
	})
	.set(RouteEnum.Requests, {
		name: "requests",
		path: "requests",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: RequestsPage,
	})
	.set(RouteEnum.RequestDetail, {
		// providers or other users to see
		name: "Request Detail",
		path: "request-detail/:requestId",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: RequestDetailsPage,
	})
	.set(RouteEnum.Profile, {
		name: "Profile",
		path: "profile",
		authorizeLevel: AuthorizeLevels.USER,
		component: ProfilePage,
	})
	.set(RouteEnum.UserRequests, {
		// request management
		name: "My Requests",
		path: "requests",
		authorizeLevel: AuthorizeLevels.USER,
		component: UserRequestsPage,
	})
	.set(RouteEnum.PostRequest, {
		name: "New Request",
		path: "request/post",
		authorizeLevel: AuthorizeLevels.USER,
		component: PostRequestPage,
	})
	.set(RouteEnum.UserOrder, {
		name: "My Order",
		path: "order",
		authorizeLevel: AuthorizeLevels.USER,
		component: UserOrderPage,
	})
	.set(RouteEnum.OrderDetail, {
		name: "Order Detail",
		path: "order-detail/:id",
		authorizeLevel: AuthorizeLevels.USER,
		component: OrderDetailsPage,
	})
	.set(RouteEnum.ProviderRegister, {
		name: "Provider Registration",
		path: "provider/register",
		authorizeLevel: AuthorizeLevels.USER,
		component: ProviderRegisterPage,
	})
	.set(RouteEnum.ProviderProfile, {
		name: "Profile",
		path: "profile",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: ProviderProfilePage,
	})
	.set(RouteEnum.MyOffer, {
		// offer management
		name: "My Offer",
		path: "offer",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: OfferPage,
	})
	.set(RouteEnum.OfferDetail, {
		name: "Offer Details",
		path: "offer-details/:id",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: OfferDetailsPage,
	})
	.set(RouteEnum.Task, {
		name: "task",
		path: "task",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: TaskPage,
	})
	.set(RouteEnum.TaskDetail, {
		name: "Task Details",
		path: "task-details/:id",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: TaskDetailsPage,
	})
	.set(RouteEnum.Dashboard, {
		name: "dashboard",
		path: "dashboard",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: DashboardPage,
	})
	.set(RouteEnum.AdminSignIn, {
		name: "adminSignIn",
		path: "sign-in",
		authorizeLevel: AuthorizeLevels.ADMIN,
		component: AdminSignInPage,
	})
	.set(RouteEnum.Task, {
		name: "task",
		path: "task",
		authorizeLevel: AuthorizeLevels.ADMIN,
		component: AdminTasksPage,
	})
	.set(RouteEnum.TaskDetail, {
		name: "taskDetail",
		path: "task-detail/:id",
		authorizeLevel: AuthorizeLevels.ADMIN,
		component: AdminTaskDetailsPage,
	});
// .set(RouteEnum.NotFound, {
// 	name: "NotFound",
// 	path: "*",
// 	authorizeLevel: AuthorizeLevels.PUBLIC,
// 	component: NotFoundPage,
// });

const routeConfigArray = Object.freeze(Array.from(routeConfigMap.values()));

const siteMap = (route: RouteEnum): string => {
	const routeConfig = routeConfigMap.get(route);
	if (!routeConfig) return "/";
	const prefix = authorizedLevelToPrefix(routeConfig.authorizeLevel);
	return `${prefix}/${routeConfig.path}`;
};

const authorizedLevelMap = Object.freeze(
	enumToMap(AuthorizeLevels) as Map<AuthorizeLevels, string>
);

const authorizedLevelToPrefix = (authorizedLevel: AuthorizeLevels): string => {
	const level = authorizedLevelMap.get(authorizedLevel);
	return level && level !== "PUBLIC" ? level.toLowerCase() : "/";
};

export {
	authorizedLevelMap,
	authorizedLevelToPrefix,
	routeConfigArray,
	siteMap,
};

export default Object.freeze(routeConfigMap);
