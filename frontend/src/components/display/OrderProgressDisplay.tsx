import { useOrderDetailsContext } from "@/services/context/OrderDetailsContext";

type OrderProgressDisplayProps = {
  step: string;
};
export function OrderProgressDisplay(props: OrderProgressDisplayProps) {
  const { orderDto, shipmentInfoDto } = useOrderDetailsContext();
  switch (props.step) {
    case "In progress":
      return (
        <>
          <div className="text-xs text-gray-400">
            {new Date(orderDto.createdAt).toLocaleDateString()}
          </div>
          <div className="text-gray-400">Payment Success</div>
        </>
      );
    case "Shipping":
      return (
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
      );
    case "Review":
      return null;
    case "Completed":
      return null;
    default:
      return null;
  }
}
