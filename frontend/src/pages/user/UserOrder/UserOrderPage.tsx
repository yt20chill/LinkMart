import { useState } from "react";
import { OrderStatusContext } from "../../../services/context/OrderStatusContext";
import {
	OrderStatusTabs,
	orderStatusTabs,
} from "../../../types/sharePropsModel";
import OrderStatus from "./components/OrderStatus";
import OrderStatusTab from "./components/OrderStatusTab";

const UserOrderPage = () => {
	const [tab, setTab] = useState<OrderStatusTabs>("inProgress");

	return (
		<OrderStatusContext.Provider
			value={{ activeTab: tab, setActiveTab: setTab }}
		>
			<div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
				<div className="w-full bg-base-100/50 h-auto shadow rounded-xl">
					<div className="flex w-full border-b pt-4">
						{orderStatusTabs.map((tab) => (
							<OrderStatusTab key={tab} status={tab} />
						))}
					</div>
					<OrderStatus />
				</div>
			</div>
		</OrderStatusContext.Provider>
	);
};

export default UserOrderPage;
