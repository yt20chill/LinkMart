import { UserRequestCardSkeleton } from "@/components/card/UserRequestCardSkeleton";
import { useQuery } from "react-query";
import CounterBadge from "../../components/badge/CounterBadge";
import { UserRequestCard } from "../../components/card/UserRequestCard";
import { getRequestsByUserAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const UserRequestsPage = () => {
	const { data: requests, isLoading } = useQuery({
		queryKey: [queryKey.REQUEST, queryKey.USER],
		queryFn: getRequestsByUserAJAX,
	});
	return (
		<div className="mt-6 sm:mt-12 my-5 max-w-5xl w-full mx-auto sm:px-6">
			<div className="flex flex-col mx-auto bg-base-100/50 sm:border border-slate-500/20 rounded-xl overflow-hidden sm:shadow">
				<div className="py-4 indent-5 text-slate-500 bg-base-100 border-b border-slate-500/20">
					My Request <CounterBadge count={requests ? requests.length : 0} />
				</div>
				<div className="w-full p-6">
					{requests &&
						(requests.length > 0 ? (
							requests.map((req) => (
								<UserRequestCard key={req.requestId} {...req} />
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

export default UserRequestsPage;
