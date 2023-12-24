import Skeleton from "../../../../components/skeletons/Skeleton";
import { useOfferDetailsContext } from "../../../../services/context/OfferDetailsContext";
import OfferDetails from "./OfferDetails";

const OfferDetailsList = () => {
	const { offersDetails, isLoading } = useOfferDetailsContext();
	return (
		<>
			{isLoading && <Skeleton />}
			{offersDetails && offersDetails.length > 0 ? (
				offersDetails.map((offer) => (
					<OfferDetails key={offer.offerId} offerId={offer.offerId} />
				))
			) : (
				<div className="flex items-center justify-center text-gray-300 py-12">
					No Offer
				</div>
			)}
		</>
	);
};

export default OfferDetailsList;
