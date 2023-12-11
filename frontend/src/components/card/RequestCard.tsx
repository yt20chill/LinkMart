import { RequestDto } from "@/features/api/responseSchema";
import { mapDate } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function RequestCard(props: RequestDto) {
  return (
    <Link
      to={`/request-detail/${props.requestId}`}
      className="icn-hvr-fill p-1 rounded-lg shadow hover:shadow-2xl hover:scale-105 transition-all bg-base-100/25 backdrop-blur-lg min-h-[340px] border border-base-200/75"
    >
      <figure className="rounded-md h-48 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
        <img
          className="object-cover w-full"
          title={props.item}
          src={props.image}
        />
      </figure>
      <div className="px-2 pt-2">
        <div className="truncate">{props.item}</div>
        <div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 ps-1 pe-2 border border-slate-500 rounded-badge">
          <span className="material-symbols-rounded text-sm">public</span>
          {props.locationName}
        </div>

        {props.offerPrice ? (
          <div className="flex justify-end items-baseline text-2xl h-6 text-amber-800">
            <span className="text-sm">Offer $</span>
            {props.offerPrice}
          </div>
        ) : (
          <div className="flex justify-end items-center h-6 text-secondary-500">
            <span className="material-symbols-rounded text-2xl">
              contact_support
            </span>
            <div className="text-lg">Please Offer</div>
          </div>
        )}
        <div className="flex justify-end items-center gap-1 ">
          <span className="material-symbols-rounded text-lg">
            account_circle
          </span>
          {props.createdBy}
        </div>
        <div
          className="flex justify-end items-center gap-1 text-xs text-slate-400"
          title={props.updatedAt}
        >
          <span className="material-symbols-rounded text-lg">pace</span>
          {mapDate(props.updatedAt) as ReactNode}
        </div>
      </div>
    </Link>
  );
}
