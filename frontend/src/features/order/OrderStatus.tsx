import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "../../components/card/OrderCard";
import { OrderCardSkeleton } from "../../components/card/OrderCardSkeleton";
import {
	getProviderTasksAJAX,
	getUserOrdersAJAX,
} from "../../services/api/orderApi";
import { useOrderStatusTabContext } from "../../services/context/TabsContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";

type OrderStatusProps = {
	role: "user" | "provider";
};

const OrderStatus = ({ role }: OrderStatusProps) => {
	const { activeTab } = useOrderStatusTabContext();
	const { data: orders, isLoading } = useQuery({
		queryKey: [queryKey.ORDER, activeTab],
		queryFn:
			role === "user"
				? () => getUserOrdersAJAX(activeTab)
				: () => getProviderTasksAJAX(activeTab),
	});
	const navigate = useNavigate();
	return (
		<div className="p-4">
			{orders && (
				<>
					{orders.length > 0 ? (
						orders.map((order) => (
							<div
								key={order.orderId}
								onClick={(e) => {
									e.preventDefault();
									navigate(
										`${siteMap(
											role === "user"
												? RouteEnum.OrderDetail
												: RouteEnum.TaskDetail
										)}/${order.orderId}`
									);
								}}
							>
								<OrderCard {...order} isCompleted={activeTab === "complete"} />
							</div>
						))
					) : (
						<div className="flex items-center justify-center text-slate-400 h-48">
							No Order Record
						</div>
					)}
				</>
			)}
			{isLoading && <OrderCardSkeleton />}
		</div>
	);
};

export default OrderStatus;
