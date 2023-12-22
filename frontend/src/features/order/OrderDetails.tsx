import { OrderDetailsDisplay } from "@/components/display/OrderDetailsDisplay";
import ProgressBar from "../../components/ui/ProgressBar";
import { useOrderDetailsContext } from "../../services/context/OrderDetailsContext";
import { OrderStatuses, orderStatuses } from "../../types/sharePropsModel";

const OrderDetails = () => {
  const { orderDto, requestInfoDto, requestImages, shipmentInfoDto } =
    useOrderDetailsContext();

  return (
    <>
      <OrderDetailsDisplay
        {...{ ...orderDto, ...requestInfoDto, ...shipmentInfoDto }}
      />
      <div className="border-b w-100"></div>
      <ProgressBar
        steps={[...orderStatuses]}
        currentStep={orderDto.orderStatus as OrderStatuses}
      />
      <div className="border-b w-100"></div>
    </>
  );
};

export default OrderDetails;
