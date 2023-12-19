import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "../../../../components/card/OrderCard";
import { OrderCardSkeleton } from "../../../../components/card/OrderCardSkeleton";
import {
	getOrdersHistoryAJAX,
	getOrdersInProgressAJAX,
} from "../../../../services/api/orderApi";
import { useOrderStatusTabContext } from "../../../../services/context/TabsContext";
import { queryKey } from "../../../../services/query.config";
import { RouteEnum, siteMap } from "../../../../services/routes.config";

const OrderStatus = () => {
	const { activeTab } = useOrderStatusTabContext();
	const { data: orders, isLoading } = useQuery({
		queryKey: [queryKey.ORDER, activeTab],
		queryFn:
			activeTab === "inProgress"
				? getOrdersInProgressAJAX
				: getOrdersHistoryAJAX,
	});
	const navigate = useNavigate();
	return (
		<div className="p-4">
			{orders && (
				<>
					{orders.map((order) => (
						<div
							key={order.orderId}
							onClick={(e) => {
								e.preventDefault();
								navigate(`${siteMap(RouteEnum.OrderDetail)}/${order.orderId}`);
							}}
						>
							<OrderCard {...order} isCompleted={activeTab === "history"} />
						</div>
					))}
				</>
			)}
			{isLoading && <OrderCardSkeleton />}
		</div>
	);
};

export default OrderStatus;
