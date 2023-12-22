import { useQuery } from "react-query";
import Loading from "../../components/ui/Loading";
import Table from "../../components/ui/Table";
import { getProviderOffersAJAX } from "../../services/api/offerApi";
import { queryKey } from "../../services/query.config";

const OfferPage = () => {
	const { data: offers, isLoading } = useQuery({
		queryKey: [queryKey.OFFER, "provider"],
		queryFn: getProviderOffersAJAX,
	});

	if (isLoading) return <Loading />;
	return offers && <Table data={offers} />;
};

export default OfferPage;
