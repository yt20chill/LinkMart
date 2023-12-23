import { useQuery } from "react-query";
import { useShallow } from "zustand/react/shallow";
import { IconCircleFrame } from "../../components/frame/IconCircleFrame";
import Loading from "../../components/ui/Loading";
import useRedirectOnCondition from "../../features/hooks/useRedirectOnCondition";
import { getProviderDashboardAJAX } from "../../services/api/providerApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import Rating from "../user/requestDetails/components/Rating";

const DashboardPage = () => {
	const username = useAuthStore(useShallow((state) => state.username));
	useRedirectOnCondition(!username, RouteEnum.Home, "Forbidden");
	const { data, isLoading } = useQuery({
		queryKey: [queryKey.PROVIDER, "dashboard"],
		queryFn: getProviderDashboardAJAX,
	});
	if (isLoading) return <Loading />;
	return (
		<>
			<div className="flex items-center text-2xl">
				<IconCircleFrame username={username!} />
				<span>{username}</span>
			</div>
			{data && (
				<>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
						<div>
							<Balance balance={data.balance} />
						</div>
						<div>
							<ReviewSummary
								reviewCount={data.reviewCount}
								averageAttitude={data.averageAttitude}
								averageEfficiency={data.averageEfficiency}
							/>
						</div>
					</div>
					<div className="flex items-center justify-around">
						<Counter
							offerCount={data?.offerCount}
							taskCount={data?.taskCount}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default DashboardPage;

type BalanceProps = {
	balance: number;
};

const Balance = ({ balance }: BalanceProps) => {
	return (
		<>
			<div className="uppercase">BALANCE</div>
			<div>$ {balance}</div>
		</>
	);
};

type ReviewSummaryProps = {
	reviewCount: number;
	averageEfficiency: number;
	averageAttitude: number;
};

const ReviewSummary = ({
	reviewCount,
	averageAttitude,
	averageEfficiency,
}: ReviewSummaryProps) => {
	return (
		<>
			<div>Your Review</div>
			<div>Total Reviews: {reviewCount}</div>
			<span>Efficiency</span>
			<Rating name="" score={averageEfficiency} />
			<span>Attitude</span>
			<Rating name="" score={averageAttitude} />
		</>
	);
};

type CounterProps = {
	offerCount: number;
	taskCount: number;
};

const Counter = ({ offerCount, taskCount }: CounterProps) => {
	return (
		<>
			<div className="uppercase font-bold text-lg">Offer</div>
			<div className="mask mask-circle flex items-center justify-center">
				{offerCount}
			</div>
			<div className="uppercase font-bold text-lg">Task</div>
			<div className="mask mask-circle flex items-center justify-center">
				{taskCount}
			</div>
		</>
	);
};
