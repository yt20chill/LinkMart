import { useQuery } from "react-query";
import { AddressDto } from "../../schemas/responseSchema";
import { orderDetailsAJAX } from "../../services/api/orderApi";
import { getAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

export function useGuardedQueryContainer() {
	const getAddresses = useQuery<AddressDto[]>({
		queryKey: [queryKey.USER, "address"],
		queryFn: getAddressAJAX,
	});

	const useOrderDetails = (orderId: string) =>
		useQuery({
			queryKey: [queryKey.ORDER, { orderId }],
			queryFn: () => orderDetailsAJAX(orderId),
			enabled: !!orderId,
		});

	return {
		getAddresses,
		addresses: getAddresses.data,
		useOrderDetails,
	};
}
