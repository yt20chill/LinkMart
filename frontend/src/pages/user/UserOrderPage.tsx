import { OrderCard } from "@/components/card/OrderCard";
import { OrderCardSkeleton } from "@/components/card/OrderCardSkeleton";
import { useState } from "react";
import { useQuery } from "react-query";
import { getOrdersByUserAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

type Tabs = "inProgress" | "history";

const UserOrderPage = () => {
	const { data: orders, isLoading } = useQuery({
		queryKey: [queryKey.ORDER],
		queryFn: getOrdersByUserAJAX,
	});
	const [tab, setTab] = useState<Tabs>("inProgress");
	return (
		<div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
			<div className="w-full bg-base-100/50 h-auto shadow rounded-xl">
				<div className="flex w-full border-b pt-4">
					<div
						className={`border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2 ${
							tab === "inProgress" ? "border-primary-300" : ""
						}`}
						onClick={() => setTab("inProgress")}
					>
						In-progress
					</div>
					<div
						className={`border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2 ${
							tab === "history" ? "border-primary-300" : ""
						}`}
						onClick={() => setTab("history")}
					>
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
