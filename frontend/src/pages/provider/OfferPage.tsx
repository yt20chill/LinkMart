import { useQuery } from "react-query";
import Loading from "../../components/ui/Loading";
import { getProviderOffersAJAX } from "../../services/api/offerApi";
import { queryKey } from "../../services/query.config";
import { ProviderOfferCard } from "@/components/card/ProviderOfferCard";
import { UserRequestCardSkeleton } from "@/components/card/UserRequestCardSkeleton";

const OfferPage = () => {
  const { data: offers, isLoading } = useQuery({
    queryKey: [queryKey.OFFER, "provider"],
    queryFn: getProviderOffersAJAX,
  });

  if (isLoading) return <Loading />;
  return (
    <div className="mt-12 my-5 max-w-3xl w-full mx-auto px-6">
      <div className="flex flex-col mx-auto bg-base-100/50 border border-slate-500/20 rounded-xl overflow-hidden shadow">
        <div className="py-4 indent-5 text-slate-500 bg-base-100 border-b border-slate-500/20">
          My Offer
        </div>
        <div className="w-full p-6">
          {offers &&
            (offers.length > 0 ? (
              offers.map((req) => (
                <ProviderOfferCard key={req.requestId} {...req} />
              ))
            ) : (
              <div className="flex items-center justify-center text-slate-400 h-48">
                No Request Record
              </div>
            ))}
          {isLoading && (
            <>
              <UserRequestCardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
