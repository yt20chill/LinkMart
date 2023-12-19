import { createContext, useContext } from "react";
import { OrderStatusTabs, UserInfoTabs } from "../../types/sharePropsModel";

export {
	OrderStatusTabContext,
	UserInfoTabContext,
	useOrderStatusTabContext,
	useUserInfoTabContext,
};

type TabContextType<T extends string> = {
	activeTab: T;
	setActiveTab: (active: T) => void;
};

const OrderStatusTabContext = createContext<
	TabContextType<OrderStatusTabs> | undefined
>(undefined);

const UserInfoTabContext = createContext<UserInfoTabs | undefined>(undefined);

const useOrderStatusTabContext = () => {
	const context = useContext(OrderStatusTabContext);
	if (!context)
		throw new Error(
			"OrderStatusContext must be used within a OrderStatusContext Provider"
		);
	return context;
};

const useUserInfoTabContext = () => {
	const context = useContext(UserInfoTabContext);
	if (!context)
		throw new Error(
			"UserInfoTabContext must be used within a UserInfoTabContext Provider"
		);
	return context;
};
