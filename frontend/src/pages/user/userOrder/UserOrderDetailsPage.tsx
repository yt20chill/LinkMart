import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import OrderDetails from "../../../features/order/OrderDetails";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import { OrderStatuses } from "../../../types/sharePropsModel";
import OrderStatusActions from "./OrderStatusActions";

const UserOrderDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Order not found");
		navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	}
	const { data: details, isLoading } =
		useGuardedQueryContainer().useOrderDetails(orderId!);

	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;

	return (
		<>
			<OrderDetailsContext.Provider value={details}>
				<OrderDetails />
			</OrderDetailsContext.Provider>
			<OrderStatusActions
				status={details.orderStatus as OrderStatuses}
				orderId={orderId!}
			/>
		</>
	);
};

export default UserOrderDetailsPage;
