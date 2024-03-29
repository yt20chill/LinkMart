import { useNavigate } from "react-router-dom";
import { mapDate } from "../../lib/formattingUtils";
import { RequestExtendOfferCountDto } from "../../schemas/responseSchema";
import { RouteEnum, siteMap } from "../../services/routes.config";
import CounterBadge from "../badge/CounterBadge";

export function UserRequestCard({
  requestId,
  item,
  primaryImage,
  locationName,
  offerPrice,
  updatedAt,
  offerCount,
}: RequestExtendOfferCountDto) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`${siteMap(RouteEnum.UserRequestDetail)}/${requestId}`)
      }
      className="flex gap-3 w-full mb-2 bg-base-100/75 backdrop-blur-lg icn-hvr-fill rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all h-fit border border-slate-500/20 select-none overflow-hidden hover:ring-2 ring-primary-400 relative"
    >
      {offerCount > 0 && (
        <div className="absolute top-1 right-1">
          <CounterBadge
            count={offerCount}
            bootstrapIcon="bi-chat-square-dots-fill"
          />
        </div>
      )}
      <figure className="aspect-square rounded-lg h-24 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
        <img className="object-cover w-full" title={item} src={primaryImage} />
      </figure>
      <div className="flex flex-wrap justify-between items-center grow p-3 w-1/3">
        <div className="truncate max-w-sm">
          <div className="text-gray-400 text-xs">Request Item</div>
          <div className="text-lg truncate">{item}</div>
          <div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 px-2 border border-slate-500 rounded-badge">
            {locationName}
          </div>
        </div>
        <div className="flex px-2 ms-auto">
          <div className="w-full">
            {offerPrice ? (
              <div className="flex justify-end items-baseline text-2xl h-6 text-primary-400">
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
              {mapDate(updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
