import { GetOrderDto } from "@/schemas/responseSchema";
import { calculateETA } from "../../lib/formattingUtils";
import { PriceDisplay } from "../display/PriceDisplay";
import { twMerge } from "tailwind-merge";

type OrderCardProps = GetOrderDto & {
  isCompleted?: boolean;
  className?: string;
};
export function OrderCard(props: OrderCardProps) {
  const textColor = props.isCompleted ? "text-slate-400" : "text-base-content";
  return (
    <div
      className={twMerge(
        "bg-base-100 rounded-2xl shadow flex flex-wrap overflow-hidden mb-4 hover:ring-2 hover:ring-secondary-500 hover:shadow-lg hover:-translate-y-1 transition-all border",
        props.className ?? ""
      )}
    >
      <div className="w-full border-b py-2 pl-4 text-sm text-slate-500 tracking-tight flex items-center">
        # {props.orderId}
        <span className="material-symbols-rounded text-sm h-6 ml-1 text-slate-300 hover:text-slate-50">
          content_copy
        </span>
      </div>
      <div className="m-2 aspect-square rounded-xl overflow-hidden h-20 w-20 bg-slate-200 flex justify-center items-center border border-slate-200">
        <img
          src="https://dummyimage.com/600x400/000/eee"
          className="object-cover h-full"
          title={props.item}
        />
      </div>
      <div className="flex flex-wrap justify-between grow px-6 py-4">
        <div className="">
          <div className={`text-xl ${textColor}`}>{props.item}</div>
          <div
            className={`${
              props.isCompleted ? "text-slate-400" : " text-emerald-400"
            } me-1 font-bold text-sm`}
          >
            {props.orderStatus.toUpperCase()}
          </div>
          <div className="flex text-xs text-slate-400 gap-6">
            <div className="border-s-4 ps-2">
              <span className="text-xs me-2">Estimated Date</span>
              <span className="font-bold">
                {calculateETA(props.createdAt, props.estimatedProcessTime)}
              </span>
            </div>
            <div className="border-s-4 ps-2">
              <span className="text-xs me-2">Qty</span>
              <span className="font-bold">{props.quantity}</span>
            </div>
          </div>
        </div>
        <div className={`p-2 flex items-end ${textColor}`}>
          {<PriceDisplay price={props.price} badgeContent="" />}
        </div>
      </div>
    </div>
  );
}
