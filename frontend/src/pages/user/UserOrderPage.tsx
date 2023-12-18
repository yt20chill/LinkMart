import { OrderCard } from "@/components/card/OrderCard";
import { OrderCardSkeleton } from "@/components/card/OrderCardSkeleton";
import { GetOrderDto } from "@/schemas/responseSchema";

function UserOrderPage() {
  const orderList: GetOrderDto[] = [
    {
      orderId: "01HHVY6Z37TZVDWJW8SCGF37RD",
      orderStatus: "Pending",
      providerId: "1",
      providerName: "ProviderEX",
      item: "明日香",
      primaryImage: "https://dummyimage.com/600x400/000/eee",
      quantity: "1",
      price: 100,
      estimatedProcessTime: 14,
      createdAt: "2023-12-13 11:24",
    },
    {
      orderId: "01HHVY6Z37TZVDWJW8SCGF12RD",
      orderStatus: "Pending",
      providerId: "1",
      providerName: "ProviderEX",
      item: "Uniqlo Jacket",
      primaryImage: "https://dummyimage.com/600x400/000/eee",
      quantity: "1",
      price: 100,
      estimatedProcessTime: 14,
      createdAt: "2023-12-13 11:24",
    },
  ];
  return (
    <div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
      <div className="w-full bg-base-100/50 h-auto shadow rounded-xl">
        <div className="flex w-full border-b pt-4">
          <div className="border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2">
            In-progress
          </div>
          <div className="border-b-4 border-slate-300 hover:border-primary-300 px-12 py-2">
            Order History
          </div>
        </div>
        <div className="p-4">
          {orderList.map((order) => (
            <OrderCard key={order.orderId} {...order} />
          ))}
          <OrderCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default UserOrderPage;
