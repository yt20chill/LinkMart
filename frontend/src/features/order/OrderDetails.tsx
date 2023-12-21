import { OrderCard } from "../../components/card/OrderCard";
import ProgressBar from "../../components/ui/ProgressBar";
import TaskStatusActions from "../../pages/provider/taskDetails/TaskStatusActions";
import { useOrderDetailsContext } from "../../services/context/OrderDetailsContext";
import { OrderStatuses, orderStatuses } from "../../types/sharePropsModel";

const OrderDetails = () => {
	const { orderDto, requestInfoDto, requestImages } = useOrderDetailsContext();

	return (
		<>
			<ProgressBar
				steps={[...orderStatuses]}
				currentStep={orderDto.orderStatus as OrderStatuses}
			/>
			<OrderCard {...orderDto} />
			<>{JSON.stringify(requestInfoDto)}</>
			<>{JSON.stringify(requestImages)}</>
			<TaskStatusActions />
		</>
	);
};

export default OrderDetails;
