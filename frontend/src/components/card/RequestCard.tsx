import { RequestDto } from "@/schemas/responseSchema";
import { RouteEnum, siteMap } from "@/services/routes.config";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { mapDate } from "../../lib/formattingUtils";

export function RequestCard({
  requestId,
  item,
  primaryImage,
  locationName,
  offerPrice,
  createdBy,
  updatedAt,
}: RequestDto) {
  return (
    <Link
      to={`/request-detail/${requestId}`}
      className="inline-box relative bg-base-100/75 backdrop-blur-lg icn-hvr-fill rounded-xl [&_a]:hover:flex p-2 hover:shadow-xl hover:-translate-y-1 transition-all h-fit border border-slate-300 select-none overflow-hidden"
    >
      <figure className="rounded-t-lg h-48 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
        <img className="object-cover w-full" title={item} src={primaryImage} />
      </figure>
      <div className="px-2 pt-1">
        <div className="truncate mb-1">{item}</div>
        <div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 px-2 border border-slate-500 rounded-badge">
          {locationName}
        </div>
      </div>
      <div className="flex px-2">
        <div className="w-full">
          {offerPrice ? (
            <div className="flex justify-end items-baseline text-2xl h-6 text-secondary-800">
              <span className="text-sm">Offer $</span>
              {offerPrice.toLocaleString("en")}
            </div>
          ) : (
            <div className="flex justify-end items-center h-6 text-secondary-500">
              <span className="material-symbols-rounded text-xl">
                contact_support
              </span>
              <div className="text">Please Offer</div>
            </div>
          )}
          <div className="flex justify-end items-center gap-1">
            <span className="material-symbols-rounded text-lg">
              account_circle
            </span>
            {createdBy}
          </div>
          <div
            className="flex justify-end items-center gap-1 text-xs text-slate-400"
            title={updatedAt}
          >
            <span className="material-symbols-rounded text-lg">pace</span>
            {mapDate(updatedAt) as ReactNode}
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2">
        <Link
          to={`${siteMap(RouteEnum.PostRequest)}?cloneId=${requestId}`}
          className="hidden flex-col justify-center rounded-lg border border-slate-200 bg-base-200/10 [&>span]:hover:text-2xl w-12 h-12 hover:w-24 hover:h-16 [&_div]:hover:flex [&_div]:hover:max-h-24 transition-all text-slate-500 overflow-hidden hover:ring-2 ring-primary-500/25 hover:bg-base-200/95 hover:text-primary-500 hover:shadow-lg hover:rounded-3xl"
        >
          <span className="material-symbols-rounded text-lg mx-1 flex items-center justify-center">
            add_shopping_cart
          </span>
          <div className="flex text-xs justify-center items-start max-h-0 overflow-hidden transition-all">
            Want Too
          </div>
        </Link>
      </div>
    </Link>
  );
}
