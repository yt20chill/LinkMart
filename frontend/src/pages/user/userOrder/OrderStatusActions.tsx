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
      return (
        <div className="text-5xl">
          Waiting for the provider to upload shipment proof...
        </div>
      );
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

const Shipping = ({ orderId }: BaseOrderActionProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: confirmReceived } = useMutation({
    mutationFn: () => confirmReceivedAJAX(orderId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
    },
  });
  return (
    <PrimaryButton
      label="Received"
      onClick={fireAlert({
        options: sweetAlertOption,
        onConfirmed: confirmReceived,
      })}
    />
  );
};

const Review = ({ orderId }: BaseOrderActionProps) => {
  return <ReviewForm orderId={orderId} />;
};
