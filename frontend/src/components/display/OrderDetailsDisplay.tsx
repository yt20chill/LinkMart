import { GetOrderDto } from "@/schemas/responseSchema";
import { calculateETA } from "../../lib/formattingUtils";
import { PriceDisplay } from "./PriceDisplay";
import { twMerge } from "tailwind-merge";
import { DetailDisplay } from "./DetailDisplay";

type OrderCardProps = GetOrderDto & {
  isCompleted?: boolean;
  className?: string;
};
export function OrderDetailsDisplay(props: OrderCardProps) {
  const textColor = props.isCompleted ? "text-slate-400" : "text-base-content";
  return (
    <div className={twMerge("", props.className ?? "")}>
      <div className="w-full border-b p-6 pb-2 text text-slate-500 tracking-tight flex items-center">
        Order
      </div>

      <div className="flex flex-wrap justify-start grow px-6 gap-6 py-4">
        <div className="aspect-square rounded-xl overflow-hidden h-40 w-40 bg-slate-200 flex justify-center items-center border border-slate-200">
          <img
            src="https://dummyimage.com/600x400/000/eee"
            className="object-cover h-full"
            title={props.item}
          />
        </div>
        <div className="py-2 grow">
          <div className="leading-none flex flex-col">
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <span className="material-symbols-rounded text-base">
                receipt_long
              </span>
              Reference No.
            </span>
            <div
              className={twMerge(
                "text-lg",
                props.isCompleted ? "text-slate-400" : " text-base-content"
              )}
            >
              <span className="text-slate-300 me-1 text-sm">#</span>
              {props.orderId}
            </div>
          </div>
          <div className="leading-none inline-flex flex-col">
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <span className="material-symbols-rounded text-base">
                donut_large
              </span>
              Order Status
            </span>
            <div
              className={twMerge(
                "inline-flex px-2 text-white me-1 text-sm items-center justify-center rounded-xl",
                props.isCompleted ? "bg-slate-400" : " bg-emerald-400"
              )}
            >
              {props.orderStatus.toUpperCase()}
            </div>
          </div>
          <div className="flex">
            <div className="leading-none flex flex-col">
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <span className="material-symbols-rounded text-base">
                  event_upcoming
                </span>
                Estimated Date
              </span>
              <div
                className={twMerge(
                  "text-lg",
                  props.isCompleted ? "text-slate-400" : " text-base-content"
                )}
              >
                <div className="font-roboto-mono">
                  {calculateETA(props.createdAt, props.estimatedProcessTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b flex w-screen"></div>
      <div className="flex flex-col">
        <div className="w-full border-b px-6 py-2 text text-slate-500 tracking-tight flex items-center">
          Payment
        </div>
        <div className="flex flex-col py-2 px-6">
          <div className="flex flex-col my-5">
            <b className="text-gray-400 text-xs me-4">Date</b>
            <span>{new Date(props.createdAt).toLocaleDateString()}</span>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400">
                <th className="w-3/4">Item</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.item}</td>
                <td>{props.quantity}</td>
                <td>HK${props.price.toLocaleString("en")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
