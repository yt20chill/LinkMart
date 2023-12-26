import { useOrderDetailsContext } from "@/services/context/OrderDetailsContext";
import { OrderStatuses } from "@/types/sharePropsModel";

type OrderProgressDisplayProps = {
  step: OrderStatuses;
};
export function OrderProgressDisplay(props: OrderProgressDisplayProps) {
  const { orderDto, shipmentInfoDto } = useOrderDetailsContext();
  console.log(props.step);
  switch (props.step) {
    case "In Progress":
      return (
        <>
          <div className="text-xs text-gray-400">
            {new Date(orderDto.createdAt).toLocaleDateString()}
          </div>
          <div className="text-gray-400 font-bold">
            <i className="bi bi-check-lg me-1 text-green-600"></i>Payment
            Success
          </div>
        </>
      );
    case "Shipped":
      return (
        <>
          <div className="min-w-96 max-w-full mb-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-400">Carrier</div>
                <div className="text-gray-400 font-bold">
                  {shipmentInfoDto.companyName}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Shipment No.</div>
                <div className="text-gray-400 font-bold">
                  {shipmentInfoDto.shippingOrderNo}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Shipping Address</div>
                <div className="text-gray-400 font-bold">
                  {shipmentInfoDto.address}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    case "Completed":
      return (
        <div className="text-gray-400 font-bold">
          <i className="bi bi-check-lg me-1 text-green-600"></i>Item Received
        </div>
      );
    case "Reviewed":
      return (
        <div className="text-gray-400 font-bold">
          <i className="bi bi-check-lg me-1 text-green-600"></i>Order Completed
        </div>
      );
    default:
      return null;
  }
}
