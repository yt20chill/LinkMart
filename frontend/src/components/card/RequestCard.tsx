import { RequestDto } from "@/schemas/responseSchema";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { mapDate } from "../../lib/formattingUtils";
import { RouteEnum, siteMap } from "@/pages/routes.config";

export function RequestCard(props: RequestDto) {
  return (
    <Link
      to={`/request-detail/${props.requestId}`}
      className="bg-base-100/25 backdrop-blur-lg icn-hvr-fill rounded-lg shadow [&_a]:hover:flex p-2 hover:shadow-2xl hover:scale-105 transition-all h-max-content border border-base-200/75 select-none overflow-hidden"
    >
      <figure className="rounded-md h-48 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
        <img
          className="object-cover w-full"
          title={props.item}
          src={props.image}
        />
      </figure>
      <div className="px-2 pt-1">
        <div className="truncate">{props.item}</div>
        <div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 ps-1 pe-2 border border-slate-500 rounded-badge">
          <span className="material-symbols-rounded text-sm">public</span>
          {props.locationName}
        </div>
      </div>
      <div className="px-2 pt-2 flex">
        <div>
          <Link
            to={siteMap(RouteEnum.PostRequest)}
            className="hidden flex-col justify-center rounded-lg border border-base-300/75 bg-base-200/10 backdrop-blur-md [&>span]:hover:text-2xl w-12 h-12 hover:w-24 hover:h-16 [&_div]:hover:flex [&_div]:hover:max-h-24 transition-all text-slate-500 overflow-hidden hover:ring-2 ring-orange-500/25 hover:bg-orange-500 hover:text-slate-100"
          >
            <span className="material-symbols-rounded text-lg mx-1 flex items-center justify-center">
              add_shopping_cart
            </span>
            <div className="flex text-xs justify-center items-start max-h-0 overflow-hidden transition-all">
              Want Too
            </div>
          </Link>
        </div>
        <div className="grow">
          {props.offerPrice ? (
            <div className="flex justify-end items-baseline text-2xl h-6 text-amber-800">
              <span className="text-sm">Offer $</span>
              {props.offerPrice}
            </div>
          ) : (
            <div className="flex justify-end items-center h-6 text-secondary-500">
              <span className="material-symbols-rounded text-xl">
                contact_support
              </span>
              <div className="text">Please Offer</div>
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
      </div>
    </Link>
  );
}
