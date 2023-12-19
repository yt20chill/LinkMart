import { IconCircleFrame } from "../../../../components/frame/IconCircleFrame";
import FormModal from "../../../../components/modal/FormModal";
import CancelButton from "../../../../components/ui/CancelButton";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import AcceptOfferForm from "../../../../features/forms/AcceptOfferForm";
import { fireAlert, sweetAlertDefaultOptions } from "../../../../lib/formUtils";
import { useControlModalContext } from "../../../../services/context/ControlModalContext";
import { useOfferDetailsContext } from "../../../../services/context/OfferDetailsContext";
import Rating from "./Rating";

type OfferDetailsProps = {
	offerId: string;
};

const sweetAlertOptions = {
	...sweetAlertDefaultOptions,
	text: "Are you sure you want to decline this offer?",
};

const OfferDetails = ({ offerId }: OfferDetailsProps) => {
	const { offerDetails, onDecline } = useOfferDetailsContext(offerId);
	const { setIsShow } = useControlModalContext();
	if (!offerDetails) return null;
	// TODO: missing a page show provider details
	const {
		efficiency,
		attitude,
		providerName,
		providerId,
		reviewCount,
		...displayDetails
	} = offerDetails;
	const score = (efficiency + attitude) / 2;

	return (
		<>
			<div className="bg-base-100 rounded-lg w-full mb-2 shadow">
				<div className="flex items-center border-b p-2">
					<IconCircleFrame username={providerName} />
					<span>{providerName}</span>
					<div className="ms-auto flex items-center gap-1">
						{reviewCount ? (
							<>
								<span className="text-sm">{score.toFixed(1)}</span>
								<Rating
									name={`${providerId}-score`}
									label=""
									score={score}
									readOnly={true}
								/>
								<span className="text-sm">({reviewCount})</span>
							</>
						) : (
							<span>No Record Yet</span>
						)}
					</div>
				</div>
				<div className="max-md:px-3 px-6 py-3">
					<div className="flex flex-wrap gap-12 mb-2">
						<div
							className="flex items-center gap-[2px] tooltip"
							data-tip="Offer Price"
						>
							<span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
								attach_money
							</span>
							<b className="font-normal">
								{displayDetails.price.toLocaleString("en")}
							</b>
						</div>
						<div
							className="flex items-center gap-[2px] tooltip"
							data-tip="Estimated Process Time"
						>
							<span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
								schedule
							</span>
							<b className="font-normal">
								{displayDetails.estimatedProcessTime}
								<span className="pl-1 text-sm text-slate-400">Days</span>
							</b>
						</div>
					</div>

					{displayDetails.offerRemark && (
						<div
							className="inline-flex items-center gap-[2px] tooltip"
							data-tip="Provider Remarks"
						>
							<span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
								contact_support
							</span>
							<span className="truncate">{displayDetails.offerRemark}</span>
						</div>
					)}

					<div className="">
						<div className="flex justify-end items-center gap-2">
							<PrimaryButton label="Accept" onClick={() => setIsShow(true)} />
							<CancelButton
								label="Deny"
								onClick={fireAlert({
									options: sweetAlertOptions,
									onConfirmed: () => onDecline(offerId),
								})}
							/>
						</div>
					</div>
				</div>
			</div>
			<FormModal>
				<AcceptOfferForm offerId={offerId} />
			</FormModal>
		</>
	);
};

export default OfferDetails;
