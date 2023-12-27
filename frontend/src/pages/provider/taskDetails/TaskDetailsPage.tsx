import { ControlModalContext } from "@/services/context/ControlModalContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormModal from "../../../components/modal/FormModal";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import ReportForm from "../../../features/forms/ReportForm";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import { OrderDetailsDisplay } from "../../../features/order/OrderDetailsDisplay";
import { ignoreCaseAndPlural } from "../../../lib/formattingUtils";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum } from "../../../services/routes.config";
import { orderStatuses } from "../../../types/sharePropsModel";
import TaskStatusActions from "./TaskStatusActions";

const TaskDetailsPage = () => {
	const { orderId } = useParams();
	useRedirectOnCondition(!orderId, RouteEnum.Task, "Invalid Task");
	const { data: details, isLoading } =
		useGuardedQueryContainer().useOrderDetails(orderId!);
	const [showReportForm, setShowReportForm] = useState(false);
	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;
	return (
		<ControlModalContext.Provider
			value={{ isShow: showReportForm, setIsShow: setShowReportForm }}
		>
			<div className="my-5 max-w-7xl w-full flex flex-col mx-auto bg-base-100 overflow-hidden rounded-3xl md:shadow [&_.active+div]:max-h-[2000px] [&_.active+div]:pb-6 mb-6">
				<OrderDetailsContext.Provider value={details}>
					<OrderDetailsDisplay />
					<div className="border-b border-slate-500/20 w-100"></div>
					<ProgressBar
						steps={[...orderStatuses]}
						currentStep={
							ignoreCaseAndPlural(details.orderStatus, [...orderStatuses]) ??
							orderStatuses[0]
						}
					>
						<TaskStatusActions />
					</ProgressBar>
				</OrderDetailsContext.Provider>
			</div>
			<FormModal>
				{/* <FormLayout title="Report Form" bootstrapIcon="bi-send-exclamation"> */}
				<ReportForm orderId={orderId!} />
				{/* </FormLayout> */}
			</FormModal>
		</ControlModalContext.Provider>
	);
};

export default TaskDetailsPage;
