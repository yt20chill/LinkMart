import { RequestDto } from "@/features/api/responseSchema";
import { mapDate } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function RequestCard(props: RequestDto) {
  return (
    <Link
      to={`/request-detail/${props.requestId}`}
      className="p-2 rounded-lg shadow-sm border border-orange-200/25 hover:scale-[101%] transition-all bg-base-100/30 backdrop-blur-md"
    >
      <figure className="rounded-md h-48 flex justify-center bg-slate-300 overflow-hidden">
        <img
          className="object-cover w-full"
          title={props.item}
          src={props.image}
        />
      </figure>
      <div className="px-2 pt-2">
        <div className="truncate">{props.item}</div>
        <div className="flex items-center font-light text-sm gap-1 text-slate-500">
          <span className="material-symbols-rounded text-sm">public</span>
          {props.locationName}
        </div>

        {props.offerPrice ? (
          <div className="flex justify-end items-baseline font-bold text-2xl h-6 text-orange-800">
            <span className="text-lg">$</span>
            {props.offerPrice}
          </div>
        ) : (
          <div className="flex justify-end items-center font-bold h-6 text-orange-500">
            <span className="material-symbols-rounded text-2xl">
              contact_support
            </span>
            <div className="text-2xl">Offer</div>
          </div>
        )}
        <div className="flex justify-end items-center gap-1">
          <span className="material-symbols-rounded text-lg">
            account_circle
          </span>
          {props.createdBy}
        </div>
        <div
          className="flex justify-end items-center gap-1 text-sm text-slate-400"
          title={props.updatedAt}
        >
          <span className="material-symbols-rounded text-lg">pace</span>
          {mapDate(props.updatedAt) as ReactNode}
        </div>
      </div>
    </Link>
  );
}
