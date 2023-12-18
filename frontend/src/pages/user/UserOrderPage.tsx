import { OrderCard } from "@/components/card/OrderCard";
import { OrderCardSkeleton } from "@/components/card/OrderCardSkeleton";
import { useQuery } from "react-query";
import { getOrdersByUserAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const UserOrderPage = () => {
	const { data: orders, isLoading } = useQuery({
		queryKey: [queryKey.ORDER],
		queryFn: getOrdersByUserAJAX,
	});

	return (
		<div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
			<div className="w-full bg-base-100/50 h-auto shadow rounded-xl">
				<div className="flex w-full border-b pt-4">
					<div className="border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2">
						In-progress
					</div>
					<div className="border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2">
						Order History
					</div>
				</div>
				<div className="p-4">
					{orders &&
						orders.map((order) => <OrderCard key={order.orderId} {...order} />)}
					{isLoading && <OrderCardSkeleton />}
				</div>
			</div>
		</div>
	);
};

export default UserOrderPage;
