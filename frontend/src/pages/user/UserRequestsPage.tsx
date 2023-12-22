import { useQuery } from "react-query";
import { RequestCardSkeleton } from "../../components/card/RequestCardSkeleton";
import { UserRequestCard } from "../../components/card/UserRequestCard";
import { getRequestsByUserAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const UserRequestsPage = () => {
	const { data: requests } = useQuery({
		queryKey: [queryKey.REQUEST],
		queryFn: getRequestsByUserAJAX,
	});
	return (
		<div className="my-5 max-w-5xl w-full mx-auto px-6">
			<div className="flex flex-col mx-auto bg-base-100/50 border border-slate-300 rounded-xl overflow-hidden shadow">
				<div className="py-4 indent-5 text-slate-500 bg-base-100 border-b border-slate-300">
					My Request
				</div>
				<div className="w-full p-6 min-h-[600px]">
					{requests ? (
						requests.map((req) => (
							<UserRequestCard key={req.requestId} {...req} />
						))
					) : (
						<RequestCardSkeleton />
					)}
				</div>
			</div>
		</div>
	);
};

export default UserRequestsPage;
