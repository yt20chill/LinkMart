import { PillBadge } from "@/components/badge/PillBadge";
import { PriceDisplay } from "@/components/display/PriceDisplay";
import { useNavigate } from "react-router-dom";
type Order = {
  orderId: string;
  orderStatus: string;
  providerId: string;
  providerName: string;
  item: string;
  primaryImage: string;
  quantity: number;
  price: number;
  estimatedProcessTime: number;
  createdAt: Date;
};
const NotFoundPage = () => {
  const navigate = useNavigate();
  const orderList: Order[] = [
    {
      orderId: "01HHVY6Z37TZVDWJW8SCGF37RD",
      orderStatus: "Pending",
      providerId: "1",
      providerName: "ProviderEX",
      item: "Uniqlo Jacket",
      primaryImage: "https://dummyimage.com/600x400/000/eee",
      quantity: 1,
      price: 100,
      estimatedProcessTime: 14,
      createdAt: new Date("2023-12-13 11:24"),
    },
  ];
  return (
    <>
      <div className="mt-12 max-w-5xl w-full flex flex-col mx-auto px-6">
        <div className="w-">
          <div></div>
        </div>
        <div className="indent-2">Order</div>
        {orderList.map((order) => (
          <div
            key={order.orderId}
            className="bg-base-100 rounded-2xl shadow flex flex-wrap overflow-hidden"
          >
            <div className="m-2 aspect-square rounded-xl overflow-hidden h-36 w-36 bg-slate-200 flex justify-center items-center border border-slate-200">
              <img
                src="https://dummyimage.com/600x400/000/eee"
                className="object-cover h-full"
                title={order.item}
              />
            </div>
            <div className="flex flex-wrap justify-between grow px-6 py-4">
              <div className="">
                <div className="text-xs text-slate-400">Order Item</div>
                <div className="text-xl border-b-4 border-primary-400">
                  {order.item}
                </div>
                <div className="text-emerald-400 me-1 font-bold">
                  {order.orderStatus}
                </div>
              </div>
              <div className="p-2 flex">
                {<PriceDisplay price={order.price} badgeContent="" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid h-screen px-4 bg-white place-content-center hidden">
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-9xl">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
          <p
            onClick={() => {
              navigate("/");
            }}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
