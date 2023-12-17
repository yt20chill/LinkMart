import { useState } from "react";
import { DetailDisplay } from "../../../../components/display/DetailDisplay";
import { IconCircleFrame } from "../../../../components/frame/IconCircleFrame";
import FormModal from "../../../../components/modal/FormModal";
import CancelButton from "../../../../components/ui/CancelButton";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import AcceptOfferForm from "../../../../features/forms/AcceptOfferForm";
import { fireAlert, sweetAlertDefaultOptions } from "../../../../lib/formUtils";
import { camelToTitleCase } from "../../../../lib/utils";
import { ControlModalContext } from "../../../../services/context/ControlModalContext";
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
	const [showAcceptForm, setShowAcceptForm] = useState(false);
	if (!offerDetails) return null;
	// TODO: missing a page show provider details
	const {
		efficiency,
		attitude,
		providerName,
		providerId,
		reviewCount,
		offerId: offerIdFromAPI,
		...displayDetails
	} = offerDetails;
	const score = (efficiency + attitude) / 2;
	return (
		<>
			<div className="flex">
				{Object.entries(displayDetails).map(([key, value]) => (
					<DetailDisplay
						key={key}
						label={camelToTitleCase(key)}
						value={value?.toString() ?? ""}
					/>
				))}
			</div>
			<div>
				<IconCircleFrame username={providerName} />
				<span>{score.toFixed(1)}</span>
				<Rating
					name={`${providerId}-score`}
					label=""
					score={score}
					readOnly={true}
				/>
				<span>({reviewCount})</span>
				<div className="flex">
					<PrimaryButton
						label="Accept"
						onClick={() => setShowAcceptForm(true)}
					/>
					<CancelButton
						label="Decline"
						onClick={fireAlert({
							options: sweetAlertOptions,
							onConfirmed: () => onDecline(offerId),
						})}
					/>
				</div>
			</div>
			<ControlModalContext.Provider
				value={{ isShow: showAcceptForm, setIsShow: setShowAcceptForm }}
			>
				<FormModal>
					<AcceptOfferForm offerId={offerId} />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
};

export default OfferDetails;
