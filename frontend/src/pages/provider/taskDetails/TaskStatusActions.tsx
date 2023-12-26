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
  switch (ignoreCaseAndPlural(orderStatus, [...orderStatuses])) {
    case "In Progress":
      return <UpdateShipment orderId={orderId} />;
    case "Shipped":
      return <Shipping {...shipmentInfoDto} />;
    case "Completed":
      return <Review />;
    case "Reviewed":
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
    </>
  );
};
const Review = () => {
  return <div>User has confirmed received</div>;
};

//TODO: display review
const Completed = () => {
  return null;
};
