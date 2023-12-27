import { useMutation, useQueryClient } from "react-query";
import { SweetAlertOptions } from "sweetalert2";
import { FormLayout } from "../../../components/ui/FormLayout";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import ReviewForm from "../../../features/forms/ReviewForm";
import { fireAlert } from "../../../lib/formUtils";
import { ignoreCaseAndPlural } from "../../../lib/formattingUtils";
import { confirmReceivedAJAX } from "../../../services/api/orderApi";
import { useOrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { queryKey } from "../../../services/query.config";
import {
	BaseOrderActionProps,
	orderStatuses,
} from "../../../types/sharePropsModel";

const sweetAlertOption: SweetAlertOptions = {
	title: "Confirm Received?",
	text: "We will pay the provider upon your confirmation",
	icon: "info",
	showCancelButton: true,
};
const OrderStatusActions = () => {
	const {
		orderDto: { orderId, orderStatus },
	} = useOrderDetailsContext();
	switch (ignoreCaseAndPlural(orderStatus, [...orderStatuses])) {
		case "In Progress":
			return <InProgress />;
		case "Shipped":
			return <Shipping orderId={orderId} />;
		case "Completed":
			return <Review orderId={orderId} />;
		case "Reviewed":
			return null;
		default:
			return null;
	}
};

export default OrderStatusActions;
const InProgress = () => {
	const { orderDto } = useOrderDetailsContext();
	return (
		<>
			<div className="text-xs text-gray-400">
				{new Date(orderDto.createdAt).toLocaleDateString()}
			</div>
			<div className="text">Payment Success</div>
			<div className="text">Provider is processing...</div>
		</>
	);
};
const Shipping = ({ orderId }: BaseOrderActionProps) => {
	const { shipmentInfoDto } = useOrderDetailsContext();
	const queryClient = useQueryClient();
	const { mutateAsync: confirmReceived } = useMutation({
		mutationFn: () => confirmReceivedAJAX(orderId),
		onSuccess: async () => {
			await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
		},
	});
	return (
		<>
			<div className="pb-3 w-96 max-w-full">
				<div className="grid grid-cols-2 gap-3">
					<div>
						<div className="text-xs">Carrier</div>
						<div className="font-bold flex flex-col">
							{shipmentInfoDto.companyName}
							{shipmentInfoDto.companyUrl && (
								<a
									className="font-normal text-xs leading-none hover:text-base-content/50 hover:decoration-base-content/50 decoration-dashed decoration-base-content cursor-pointer underline"
									href={shipmentInfoDto.companyUrl}
									target="_blank"
									rel="noreferrer"
								>
									<i className="me-1 bi bi-link-45deg"></i>
									{shipmentInfoDto.companyUrl}
								</a>
							)}
						</div>
					</div>
					<div>
						<div className="text-xs">Shipment No.</div>
						<div className="font-bold">{shipmentInfoDto.shippingOrderNo}</div>
					</div>
					<div>
						<div className="text-xs">Shipping Address</div>
						<div className="font-bold">{shipmentInfoDto.address}</div>
					</div>
				</div>
			</div>
			<PrimaryButton
				label="Received"
				onClick={fireAlert({
					options: sweetAlertOption,
					onConfirmed: confirmReceived,
				})}
			/>
		</>
	);
};

const Review = ({ orderId }: BaseOrderActionProps) => {
	return (
		<FormLayout title="Review" bootstrapIcon="chat-left-heart">
			<ReviewForm orderId={orderId} />
		</FormLayout>
	);
};
