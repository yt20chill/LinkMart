import AdminSignInPage from "../pages/admin/AdminSignInPage";
import AdminTaskDetailsPage from "../pages/admin/AdminTaskDetailsPage";
import AdminTasksPage from "../pages/admin/AdminTasksPage";
import DashboardPage from "../pages/provider/DashboardPage";
import OfferDetailsPage from "../pages/provider/OfferDetailsPage";
import OfferPage from "../pages/provider/OfferPage";
import ProviderProfilePage from "../pages/provider/ProviderProfilePage";
import TaskDetailsPage from "../pages/provider/TaskDetailsPage";
import TaskPage from "../pages/provider/TaskPage";
import HomePage from "../pages/public/HomePage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RequestsPage from "../pages/public/RequestsPage";
import SignInPage from "../pages/public/SignInPage";
import SignUpPage from "../pages/public/SignUpPage";
import OrderDetailsPage from "../pages/user/OrderDetailsPage";
import ProfilePage from "../pages/user/ProfilePage";
import RequestDetailsPage from "../pages/user/RequestDetailsPage";
import UserOrderPage from "../pages/user/UserOrderPage";
import UserRequestsPage from "../pages/user/UserRequestsPage";
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
		path: "order",
		authorizeLevel: AuthorizeLevel.USER,
		component: UserOrderPage,
	},
	{
		name: "orderDetail",
		path: "order-detail/:id",
		authorizeLevel: AuthorizeLevel.USER,
		component: OrderDetailsPage,
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
		path: "offer",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferPage,
	},
	{
		name: "offerDetail",
		path: "offer-detail/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: OfferDetailsPage,
	},
	{
		name: "task",
		path: "task",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskPage,
	},
	{
		name: "taskDetail",
		path: "task-detail/:id",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: TaskDetailsPage,
	},
	{
		name: "dashboard",
		path: "dashboard",
		authorizeLevel: AuthorizeLevel.PROVIDER,
		component: DashboardPage,
	},
	{
		name: "adminSignIn",
		path: "admin/sign-in",
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
