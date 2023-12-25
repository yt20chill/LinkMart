import Table from "../../../components/ui/Table";
import UploadShippingForm from "../../../features/forms/UploadShippingForm";
import { ignoreCaseAndPlural } from "../../../lib/formattingUtils";
import { useOrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { ShipmentInfoDto } from "../../../types/orderModels";
import {
	BaseOrderActionProps,
	orderStatuses,
} from "../../../types/sharePropsModel";

const TaskStatusActions = () => {
	const {
		// More details can be get from here.
		orderDto: { orderStatus, orderId },
		shipmentInfoDto,
	} = useOrderDetailsContext();
	console.log(ignoreCaseAndPlural(orderStatus, [...orderStatuses]));
	switch (ignoreCaseAndPlural(orderStatus, [...orderStatuses])) {
		case "In Progress":
			return <UpdateShipment orderId={orderId} />;
		case "Shipped":
			return <Shipping {...shipmentInfoDto} />;
		case "Reviewed":
			return <Review />;
		case "Completed":
			return <Completed />;
		default:
			return;
	}
};

export default TaskStatusActions;

const UpdateShipment = ({ orderId }: BaseOrderActionProps) => {
	return <UploadShippingForm orderId={orderId} />;
};

// TODO: show shipping info, may share between provider and user
const Shipping = (shipmentInfoDto: ShipmentInfoDto) => {
	return <Table data={[shipmentInfoDto]} />;
};

const Review = () => {
	return <div>User has confirmed received</div>;
};

//TODO: display review
const Completed = () => {
	return <div>Reviews</div>;
};
