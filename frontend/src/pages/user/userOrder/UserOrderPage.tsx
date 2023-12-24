import { useState } from "react";
import Tab from "../../../components/ui/Tab";
import OrderStatus from "../../../features/order/OrderStatus";
import {
  OrderStatusTabContext,
  TabContextType,
  useOrderStatusTabContext,
} from "../../../services/context/TabsContext";
import {
  OrderStatusTabs,
  orderStatusTabs,
} from "../../../types/sharePropsModel";

const UserOrderPage = () => {
  const [tab, setTab] = useState<OrderStatusTabs>("inProgress");
  return (
    <OrderStatusTabContext.Provider
      value={{ activeTab: tab, setActiveTab: setTab }}
    >
      <div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
        <div className="flex flex-col bg-base-100/50 border border-slate-500/20 rounded-xl overflow-hidden shadow">
          <div className="flex w-full pt-4 text-slate-500 bg-base-100 border-slate-300 ring-b-[4px]">
            {orderStatusTabs.map((tab) => (
              <Tab
                key={tab}
                status={tab}
                label={tab === "complete" ? "History" : undefined}
                useTabContext={
                  useOrderStatusTabContext as () => TabContextType<string>
                }
              />
            ))}
            <div className="border-b-4 border-slate-300 grow">
              {/*Tab gap border*/}
            </div>
          </div>
          <OrderStatus role="user" />
        </div>
      </div>
    </OrderStatusTabContext.Provider>
  );
};

export default UserOrderPage;
