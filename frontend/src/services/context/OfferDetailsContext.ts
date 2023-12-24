import { createContext, useContext } from "react";
import { OfferDetailsDto } from "../../schemas/responseSchema";

export { OfferDetailsContext, useOfferDetailsContext };

type OfferDetailsContextType = {
	offersDetails: OfferDetailsDto[];
	isLoading: boolean;
	onAccept: (offerId: string) => void;
	onDecline: (offerId: string) => void;
};

type OfferDetailsContextByOfferIdType = Omit<
	OfferDetailsContextType,
	"offersDetails"
> & {
	offerDetails: OfferDetailsDto;
};

const OfferDetailsContext = createContext<OfferDetailsContextType | undefined>(
	undefined
);

function useOfferDetailsContext(): OfferDetailsContextType;
function useOfferDetailsContext(
	offerId: string
): OfferDetailsContextByOfferIdType;
function useOfferDetailsContext(offerId?: string) {
	const offerDetailsContext = useContext(OfferDetailsContext);
	if (offerDetailsContext === undefined)
		throw new Error(
			"OfferDetailsContext must be used within a OfferDetailsContext Provider"
		);
	if (!offerId) return offerDetailsContext;
	const offerDetails: OfferDetailsDto | undefined =
		offerDetailsContext.offersDetails.find((dto) => dto.offerId === offerId);
	if (!offerDetails) throw new Error("Offer not found");
	return {
		offerDetails,
		isLoading: offerDetailsContext.isLoading,
		onAccept: offerDetailsContext.onAccept,
		onDecline: offerDetailsContext.onDecline,
	};
}
