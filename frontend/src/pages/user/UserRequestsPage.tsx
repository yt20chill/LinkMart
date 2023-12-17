import { useQuery } from "react-query";
import { RequestCard } from "../../components/card/RequestCard";
import { RequestCardSkeleton } from "../../components/card/RequestCardSkeleton";
import { getRequestsByUserAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const UserRequestsPage = () => {
	const { data: requests } = useQuery({
		queryKey: [queryKey.USER, "requests"],
		queryFn: getRequestsByUserAJAX,
	});
	return (
		<>
			{requests ? (
				requests.map((req) => <RequestCard key={req.requestId} {...req} />)
			) : (
				<RequestCardSkeleton />
			)}
		</>
	);
};

export default UserRequestsPage;
