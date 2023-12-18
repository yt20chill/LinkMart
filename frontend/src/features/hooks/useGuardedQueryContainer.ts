import { useQuery } from "react-query";
import { AddressDto } from "../../schemas/responseSchema";
import { getAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

export function useGuardedQueryContainer() {
	const getAddresses = useQuery<AddressDto[]>({
		queryKey: [queryKey.USER, "address"],
		queryFn: getAddressAJAX,
	});

	return {
		getAddresses,
		addresses: getAddresses.data,
	};
}
