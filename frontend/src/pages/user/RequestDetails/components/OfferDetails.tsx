import { PriceDisplay } from "@/components/display/PriceDisplay";
import { DetailDisplay } from "../../../../components/display/DetailDisplay";
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
    offerId: offerIdFromAPI,
    ...displayDetails
  } = offerDetails;
  const score = (efficiency + attitude) / 2;

  return (
    <>
      <div className="bg-base-100 rounded-lg overflow-hidden w-full mb-2 shadow">
        <div className="flex items-center border-b p-2">
          <IconCircleFrame username={providerName} />
          <span>{providerName}</span>
          <div className="ms-auto flex items-center gap-1">
            <span className="text-sm">{score.toFixed(1)}</span>
            <Rating
              name={`${providerId}-score`}
              label=""
              score={score}
              readOnly={true}
            />
            <span className="text-sm">({reviewCount})</span>
          </div>
        </div>
        <div className="px-6 py-3">
          <div className="grid grid-cols-2">
            <div className="col-span-2 flex justify-end">
              <PriceDisplay className="" price={displayDetails.price} />
            </div>

            <DetailDisplay
              label="Estimated Time"
              value={displayDetails.estimatedProcessTime + " Days"}
            />
            {displayDetails.offerRemark && (
              <DetailDisplay
                label="Remarks"
                value={displayDetails.offerRemark}
              />
            )}
          </div>
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
