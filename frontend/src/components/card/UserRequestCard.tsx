import { RequestDto } from "@/schemas/responseSchema";
import { RouteEnum, siteMap } from "@/services/routes.config";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { mapDate } from "../../lib/formattingUtils";
import { DetailDisplay } from "../display/DetailDisplay";

export function UserRequestCard({
  requestId,
  item,
  primaryImage,
  locationName,
  offerPrice,
  createdBy,
  updatedAt,
}: RequestDto) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/request-detail/${requestId}`)}
      className="flex gap-3 w-full mb-2 bg-base-100/75 backdrop-blur-lg icn-hvr-fill rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all h-fit border border-slate-300 select-none overflow-hidden hover:ring-2 hover:ring-offset-2 ring-secondary-400"
    >
      <figure className="aspect-square rounded-lg h-24 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
        <img className="object-cover w-full" title={item} src={primaryImage} />
      </figure>
      <div className="flex justify-between items-center grow p-3 ">
        <div>
          <div className="text-gray-400 text-xs">Request Item</div>
          <div className="text-lg">{item}</div>
          <div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 px-2 border border-slate-500 rounded-badge">
            {locationName}
          </div>
        </div>
        <div className="flex px-2">
          <div className="w-full">
            {offerPrice ? (
              <div className="flex justify-end items-baseline text-2xl h-6 text-secondary-800">
                <span className="text-sm">HK $</span>
                {offerPrice.toLocaleString("en")}
              </div>
            ) : (
              <div className="flex justify-end items-center h-6 text-secondary-500">
                <span className="material-symbols-rounded text-2xl me-1">
                  finance_chip
                </span>
                <div className="text-xl">OPEN</div>
              </div>
            )}
            <div
              className="flex justify-end items-center gap-1 text-xs text-slate-400"
              title={updatedAt}
            >
              <span className="material-symbols-rounded text-lg">pace</span>
              {mapDate(updatedAt) as ReactNode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
