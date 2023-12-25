import { useNavigate } from "react-router-dom";
import { ProviderOfferDto } from "../../schemas/responseSchema";
import { RouteEnum, siteMap } from "../../services/routes.config";

export function ProviderOfferCard({
	offerId,
	price,
	estimatedProcessTime,
	item,
	offerStatus,
	createdBy,
	primaryImage,
}: ProviderOfferDto) {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`${siteMap(RouteEnum.OfferDetail)}/${offerId}`)}
			className="flex gap-3 w-full mb-2 bg-base-100/75 backdrop-blur-lg icn-hvr-fill rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all h-fit border border-slate-500/20 select-none overflow-hidden hover:ring-2 ring-secondary-400 relative"
		>
			<figure className="aspect-square rounded-lg h-24 w-24 flex justify-center bg-slate-300 overflow-hidden border border-gray-200">
				<img className="object-cover w-full" title={item} src={primaryImage} />
			</figure>
			<div className="flex w-1/2 grow p-3 flex-col">
				<div>
					<div className="text-gray-400 text-xs">Request Item</div>
					<div className="text-lg">{item}</div>
					<div className="flex items-center">
						<i className="bi bi-person-circle me-1"></i>
						{createdBy}
					</div>
					<div className="inline-flex items-center font-light text-sm gap-1 text-slate-500 px-2 border border-slate-500 rounded-badge capitalize">
						{offerStatus}
					</div>
				</div>
				<div className="flex gap-3 items-center rounded-lg border mt-2 overflow-hidden">
					<div className="border-r p-4 text-xs bg-primary-400 text-white">
						Offer
					</div>
					{price && (
						<div className="flex flex-col text-secondary-800 leading-none">
							<span className="text-xs text-base-content">Price</span>
							<div>
								{" "}
								<span className="text-sm">$</span>
								{price.toLocaleString("en")}
							</div>
						</div>
					)}
					{estimatedProcessTime && (
						<div className="flex flex-col text-secondary-800 leading-none">
							<span className="text-xs text-base-content">ETC</span>
							<div>
								{estimatedProcessTime}
								<span className="text-sm">Days</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
