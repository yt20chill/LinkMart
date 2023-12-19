import { camelToTitleCase } from "../../../../lib/utils";
import { useOfferStatusContext } from "../../../../services/context/OrderStatusContext";
import { OrderStatusTabs } from "../../../../types/sharePropsModel";

type OrderStatusTabProps = {
	status: OrderStatusTabs;
	label?: string;
};

const OrderStatusTab = ({
	status,
	label = camelToTitleCase(status),
}: OrderStatusTabProps) => {
	const { activeTab, setActiveTab } = useOfferStatusContext();
	return (
		<div
			className={`border-b-4 hover:border-primary-300 px-12 py-2 ${
				activeTab === status ? "border-primary-300" : " border-slate-300"
			}`}
			onClick={(e) => {
				e.preventDefault();
				setActiveTab(status);
			}}
		>
			{label}
		</div>
	);
};

export default OrderStatusTab;
