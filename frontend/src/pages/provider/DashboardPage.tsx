import { PillBadge } from "@/components/badge/PillBadge";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { IconCircleFrame } from "../../components/frame/IconCircleFrame";
import Loading from "../../components/ui/Loading";
import useRedirectOnCondition from "../../features/hooks/useRedirectOnCondition";
import { getProviderDashboardAJAX } from "../../services/api/providerApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
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
		<div className="flex flex-col bg-base-100 rounded-xl mt-12 mb-6 border border-slate-500/20 pb-6">
			<div className="flex items-center text-xl p-6">
				<IconCircleFrame username={username!} className="w-8 h-8" />
				<span>{username}</span>
			</div>
			{data && (
				<>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 px-6">
						<div className="border-slate-500/10 border shadow p-4 rounded-lg flex gap-2 items-center">
							<img
								src="/image/tags/tag_coin_front.png"
								className="w-12 h-12 object-cover"
							/>
							<div className="">
								<Balance balance={data.balance} />
							</div>
						</div>
						<div className="border-slate-500/10 border shadow p-4 rounded-lg flex gap-2 items-center">
							<img
								src="/image/tags/tag_like_front.png"
								className="w-12 h-12 object-cover"
							/>
							<div className="">
								<ReviewSummary
									reviewCount={data.reviewCount}
									averageAttitude={data.averageAttitude}
									averageEfficiency={data.averageEfficiency}
								/>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 px-6 mt-6">
						<Counter
							offerCount={data?.offerCount}
							taskCount={data?.taskCount}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardPage;

type BalanceProps = {
	balance: number;
};

const Balance = ({ balance }: BalanceProps) => {
	return (
		<>
			<div className="normal-case text-sm">Balance</div>
			<div className="my-auto">
				$ <span className="text-2xl">{balance.toLocaleString("en")}</span>
			</div>
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
			<div className="normal-case text-sm">
				Review{" "}
				<PillBadge
					className="bg-primary-400 text-white"
					content={reviewCount.toString()}
				/>
			</div>
			<div className="flex gap-12">
				<div className="flex flex-col">
					<h2 className="text-3xl">{averageEfficiency.toFixed(1)}</h2>
					<div className="text-xs text-base-content">Efficiency</div>
					<div>
						<Rating size="sm" score={averageEfficiency} />
					</div>
				</div>
				<div className="flex flex-col">
					<h2 className="text-3xl">{averageAttitude.toFixed(1)}</h2>
					<div className="text-xs text-base-content">Attitude</div>
					<div>
						<Rating size="sm" score={averageAttitude} />
					</div>
				</div>
			</div>
		</>
	);
};

type CounterProps = {
	offerCount: number;
	taskCount: number;
};

const Counter = ({ offerCount, taskCount }: CounterProps) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-2">
			<div className="text-gray-400 text-sm">Overview</div>
			<div
				className="flex justify-between border-slate-500/10 border shadow px-4 py-2 rounded-lg"
				onClick={() => navigate(siteMap(RouteEnum.MyOffer))}
			>
				<span>Offer</span>
				{offerCount}
			</div>
			<div
				className="flex justify-between border-slate-500/10 border shadow px-4 py-2 rounded-lg"
				onClick={() => navigate(siteMap(RouteEnum.Task))}
			>
				<span>Task</span>
				{taskCount}
			</div>
		</div>
		/*    <div className="flex">
      <div className="flex flex-col items-center m-10">
        <div className="mask mask-circle p-10 bg-base-100 shadow flex items-center justify-center">
          {offerCount}
        </div>
        <div className="uppercase font-bold text-lg">Offer</div>
      </div>
      <div className="flex flex-col items-center m-10">
        <div className="rounded-full w-24 h-24 bg-base-100 shadow ring-slate-500/50 ring-2 flex items-center justify-center">
          {taskCount}
        </div>
        <div className="uppercase font-bold text-lg">Task</div>
      </div>
  </div>*/
	);
};
