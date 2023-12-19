import { createContext, useContext } from "react";
import { OrderStatusTabs } from "../../types/sharePropsModel";

export { OrderStatusContext, useOfferStatusContext };

type TabContextType<T extends string> = {
	activeTab: T;
	setActiveTab: (active: T) => void;
};

const OrderStatusContext = createContext<
	TabContextType<OrderStatusTabs> | undefined
>(undefined);

const useOfferStatusContext = () => {
	const context = useContext(OrderStatusContext);
	if (!context)
		throw new Error(
			"OrderStatusContext must be used within a OrderStatusContext Provider"
		);
	return context;
};
