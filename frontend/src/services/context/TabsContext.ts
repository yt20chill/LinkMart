import { createContext, useContext } from "react";
import { OrderStatusTabs, UserInfoTabs } from "../../types/sharePropsModel";

export {
	OrderStatusTabContext,
	UserInfoTabContext,
	useOrderStatusTabContext,
	useUserInfoTabContext,
};

export type TabContextType<T extends string> = {
	activeTab: T;
	setActiveTab: (active: T) => void;
};

/**
 * @param name Basically for error message
 * @returns [TabContext, useTabContext], where TabContext is the context object and useTabContext is the hook to use the context
 */
const createTabContext = <T extends string>(name?: string) => {
	const TabContext = createContext<TabContextType<T> | undefined>(undefined);

	const useTabContext = () => {
		const context = useContext(TabContext);
		if (!context)
			throw new Error(
				`${name ?? "Tab"} Context must be used within a ${
					name ?? "Tab"
				} Provider`
			);
		return context;
	};
	return { TabContext, useTabContext };
};

const {
	TabContext: OrderStatusTabContext,
	useTabContext: useOrderStatusTabContext,
} = createTabContext<OrderStatusTabs>("OrderStatusTab");

const { TabContext: UserInfoTabContext, useTabContext: useUserInfoTabContext } =
	createTabContext<UserInfoTabs>("UserInfoTab");
