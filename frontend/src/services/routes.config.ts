import { enumToMap, removeParams } from "../lib/formattingUtils";
import {
	AdminSignInPage,
	AdminTaskDetailsPage,
	AdminTasksPage,
} from "../pages/admin";
import {
	DashboardPage,
	OfferPage,
	ProviderProfilePage,
	TaskDetailsPage,
	TaskPage,
} from "../pages/provider";
import {
	HomePage,
	RequestDetailsPage,
	RequestsPage,
	SignInPage,
	SignUpPage,
} from "../pages/public";
import {
	OrderDetailsPage,
	PaymentPage,
	PostRequestPage,
	ProfilePage,
	ProviderRegisterPage,
	UserOrderPage,
	UserRequestDetailsPage,
	UserRequestsPage,
} from "../pages/user";
import { AuthorizeLevels } from "../types/authModels";

export {
	authorizedLevelMap,
	authorizedLevelToPrefix,
	providerTabs,
	routeConfigArray,
	siteMap,
};

export type { ProviderTabs };
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
	ProviderProfile,
	Profile,
	UserRequests,
	UserRequestDetail,
	PostRequest,
	RequestDetail,
	Payment,
	UserOrder,
	OrderDetail,
	ProviderRegister,
	MyProviderProfile,
	MyOffer,
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
	.set(RouteEnum.ProviderProfile, {
		name: "Provider Profile",
		path: "provider-profile/:providerId",
		authorizeLevel: AuthorizeLevels.PUBLIC,
		component: ProviderProfilePage,
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
	.set(RouteEnum.UserRequestDetail, {
		name: "My Request Detail",
		path: "request-detail/:requestId",
		authorizeLevel: AuthorizeLevels.USER,
		component: UserRequestDetailsPage,
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
		path: "order-detail/:orderId",
		authorizeLevel: AuthorizeLevels.USER,
		component: OrderDetailsPage,
	})
	.set(RouteEnum.Payment, {
		name: "Payment",
		path: "payment/:offerId",
		authorizeLevel: AuthorizeLevels.USER,
		component: PaymentPage,
	})
	.set(RouteEnum.ProviderRegister, {
		name: "Provider Registration",
		path: "provider/register",
		authorizeLevel: AuthorizeLevels.USER,
		component: ProviderRegisterPage,
	})
	.set(RouteEnum.MyProviderProfile, {
		name: "My Provider Profile",
		path: "profile", // provider/profile < without providerId will goto this page
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
	.set(RouteEnum.Task, {
		name: "task",
		path: "task",
		authorizeLevel: AuthorizeLevels.PROVIDER,
		component: TaskPage,
	})
	.set(RouteEnum.TaskDetail, {
		name: "Task Details",
		path: "task-details/:orderId",
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
	.set(RouteEnum.AdminTask, {
		name: "task",
		path: "task",
		authorizeLevel: AuthorizeLevels.ADMIN,
		component: AdminTasksPage,
	})
	.set(RouteEnum.AdminTaskDetail, {
		name: "taskDetail",
		path: "task-detail/:id",
		authorizeLevel: AuthorizeLevels.ADMIN,
		component: AdminTaskDetailsPage,
	});

const routeConfigArray = Object.freeze(Array.from(routeConfigMap.values()));

const siteMap = (route: RouteEnum): string => {
	const routeConfig = routeConfigMap.get(route);
	if (!routeConfig) return "/";
	const prefix = authorizedLevelToPrefix(routeConfig.authorizeLevel);
	return (prefix ? `/${prefix}` : "") + `/${removeParams(routeConfig.path)}`;
};

const authorizedLevelMap = Object.freeze(
	enumToMap(AuthorizeLevels) as Map<AuthorizeLevels, string>
);

const authorizedLevelToPrefix = (authorizedLevel: AuthorizeLevels): string => {
	const level = authorizedLevelMap.get(authorizedLevel);
	return level && level !== "PUBLIC" ? level.toLowerCase() : "";
};

// TODO: generate from array, object has no order
const providerTabs = Object.freeze({
	Dashboard: RouteEnum.Dashboard,
	Profile: RouteEnum.MyProviderProfile,
	Offers: RouteEnum.MyOffer,
	Tasks: RouteEnum.Task,
});

type ProviderTabs = keyof typeof providerTabs;

export default Object.freeze(routeConfigMap);
