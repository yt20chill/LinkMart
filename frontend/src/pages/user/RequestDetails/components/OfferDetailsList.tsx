import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Skeleton from "../../../../components/skeletons/Skeleton";
import { RequestId } from "../../../../schemas/requestSchema";
import {
  declineOfferAJAX,
  getAllOffersByRequestIdAJAX,
} from "../../../../services/api/offerApi";
import { OfferDetailsContext } from "../../../../services/context/OfferDetailsContext";
import { queryKey } from "../../../../services/query.config";
import OfferDetails from "./OfferDetails";

type OfferDetailsListProps = RequestId;

const OfferDetailsList = ({ requestId }: OfferDetailsListProps) => {
  const { data: offers, isLoading: isGettingOffers } = useQuery({
    queryKey: [queryKey.OFFER, { requestId }],
    queryFn: () => getAllOffersByRequestIdAJAX({ requestId }),
  });
  const queryClient = useQueryClient();
  const { mutateAsync: onDecline } = useMutation({
    mutationFn: declineOfferAJAX,
    onSuccess: async () => {
      toast.success("Offer has been declined");
      await queryClient.invalidateQueries([queryKey.OFFER, { requestId }]);
    },
  });

  return (
    <>
      {isGettingOffers && <Skeleton />}

      {offers && (
        <OfferDetailsContext.Provider
          value={{ offersDetails: offers, onDecline }}
        >
          {offers.length > 0 ? (
            offers.map((offer) => (
              <OfferDetails key={offer.offerId} offerId={offer.offerId} />
            ))
          ) : (
            <div className="flex items-center justify-center text-gray-300 py-12">
              No Offer
            </div>
          )}
        </OfferDetailsContext.Provider>
      )}
    </>
  );
};

export default OfferDetailsList;
