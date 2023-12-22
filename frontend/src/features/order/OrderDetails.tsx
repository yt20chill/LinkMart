import { OrderDetailsDisplay } from "@/components/display/OrderDetailsDisplay";
import ProgressBar from "../../components/ui/ProgressBar";
import { useOrderDetailsContext } from "../../services/context/OrderDetailsContext";
import { OrderStatuses, orderStatuses } from "../../types/sharePropsModel";

const OrderDetails = () => {
  const { orderDto, requestInfoDto, requestImages } = useOrderDetailsContext();

  return (
    <>
      <OrderDetailsDisplay {...orderDto} />
      <div className="border-b border-slate-300  w-100"></div>
      <ProgressBar
        steps={[...orderStatuses]}
        currentStep={orderDto.orderStatus as OrderStatuses}
      />
      <>{JSON.stringify(requestInfoDto)}</>
      <>{JSON.stringify(requestImages)}</>
    </>
  );
};

export default OrderDetails;
