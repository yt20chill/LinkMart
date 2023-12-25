import { ControlModalContext } from "@/services/context/ControlModalContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import { OrderDetailsDisplay } from "../../../features/order/OrderDetailsDisplay";
import { ignoreCaseAndPlural } from "../../../lib/formattingUtils";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { orderStatuses } from "../../../types/sharePropsModel";
import TaskStatusActions from "./TaskStatusActions";

const TaskDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Invalid order id");
		navigate(-1);
	}
	const { data: details, isLoading } =
		useGuardedQueryContainer().useOrderDetails(orderId!);
	const [showReportForm, setShowReportForm] = useState(false);
	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;
	return (
		<OrderDetailsContext.Provider value={details}>
			<ControlModalContext.Provider
				value={{ isShow: showReportForm, setIsShow: setShowReportForm }}
			>
				<OrderDetailsDisplay />
				<ProgressBar
					steps={[...orderStatuses]}
					currentStep={
						ignoreCaseAndPlural(details.orderStatus, [...orderStatuses]) ??
						orderStatuses[0]
					}
				>
					<TaskStatusActions />
				</ProgressBar>
			</ControlModalContext.Provider>
		</OrderDetailsContext.Provider>
	);
};

export default TaskDetailsPage;
