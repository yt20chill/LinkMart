import { useParams } from "react-router-dom";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import OrderDetails from "../../../features/order/OrderDetails";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum } from "../../../services/routes.config";
import OrderStatusActions from "./OrderStatusActions";

const UserOrderDetailsPage = () => {
	const { orderId } = useParams();

	useRedirectOnCondition(!orderId, RouteEnum.UserOrder, "Order not found");

	const { data: details, isLoading } =
		useGuardedQueryContainer().useOrderDetails(orderId!);

	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;

	return (
		<>
			<OrderDetailsContext.Provider value={details}>
				<OrderDetails />
				<OrderStatusActions />
			</OrderDetailsContext.Provider>
		</>
	);
};

export default UserOrderDetailsPage;
