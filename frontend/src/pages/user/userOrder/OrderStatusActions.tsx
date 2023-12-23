import { useMutation, useQueryClient } from "react-query";
import { SweetAlertOptions } from "sweetalert2";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import ReviewForm from "../../../features/forms/ReviewForm";
import { fireAlert, sweetAlertDefaultOptions } from "../../../lib/formUtils";
import { confirmReceivedAJAX } from "../../../services/api/orderApi";
import { useOrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { queryKey } from "../../../services/query.config";
import { BaseOrderActionProps } from "../../../types/sharePropsModel";

const sweetAlertOption: SweetAlertOptions = {
  ...sweetAlertDefaultOptions,
  title: "Confirm Received?",
  text: "We will pay the provider upon your confirmation",
  icon: "info",
};
const OrderStatusActions = () => {
  const {
    orderDto: { orderId, orderStatus },
  } = useOrderDetailsContext();
  switch (orderStatus) {
    case "In progress":
      return <InProgress />;
    case "Shipping":
      return <Shipping orderId={orderId} />;
    case "Review":
      return <Review orderId={orderId} />;
    case "Completed":
      return <div className="text-5xl">🥰</div>;
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
            <div className="font-bold">{shipmentInfoDto.companyName}</div>
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
  return <ReviewForm orderId={orderId} />;
};
