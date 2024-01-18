import { PillBadge } from "@/components/badge/PillBadge";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { IconCircleFrame } from "../../components/frame/IconCircleFrame";
import Loading from "../../components/ui/Loading";
import useRedirectOnCondition from "../../features/hooks/useRedirectOnCondition";
import NoReviewsDisplay from "../../features/providerProfile/NoReviewsDisplay";
import { getProviderDashboardAJAX } from "../../services/api/providerApi";
import { useProviderTabContext } from "../../services/context/TabsContext";
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

	if ( !username) {
		return <Navigate to={"/"} />
	}
	if (isLoading) return <Loading />;
	return (
		<>
			<div className="flex flex-col bg-base-100 rounded-xl mt-12 mb-6 sm:border border-slate-500/20 pb-6 sm:mx-6">
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
									<Balance balance={data.balance ?? 0} />
								</div>
							</div>
							<div className="border-slate-500/10 border shadow p-4 rounded-lg flex gap-2 items-center">
								<img
									src="/image/tags/tag_like_front.png"
									className="w-12 h-12 object-cover"
								/>
								<div className="">
									<ReviewSummary
										reviewCount={data.reviewCount ?? 0}
										averageAttitude={data.averageAttitude}
										averageEfficiency={data.averageEfficiency}
									/>
								</div>
							</div>
						</div>
						<div className="px-6 mt-6">
							<Counter
								offerCount={data?.offerCount}
								activeTaskCount={data?.activeTaskCount}
								completedTaskCount={data?.completedTaskCount}
							/>
						</div>
					</>
				)}
			</div>
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
			{reviewCount > 0 ? (
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
			) : (
				<NoReviewsDisplay />
			)}
		</>
	);
};

type CounterProps = {
	offerCount: number;
	activeTaskCount: number;
	completedTaskCount: number;
};

const Counter = ({
	offerCount,
	activeTaskCount,
	completedTaskCount,
}: CounterProps) => {
	const navigate = useNavigate();
	const { setActiveTab } = useProviderTabContext();
	const completionPercentage =
		completedTaskCount + activeTaskCount === 0
			? 0
			: Math.round(
					(completedTaskCount / (completedTaskCount + activeTaskCount)) * 100
			  );
	return (
		<div className="flex flex-col  w-full">
			<div className="text-gray-400 text-sm">Overview</div>
			<div className="flex justify-center flex-wrap p-3 gap-6">
				<div
					className="radial-progress text-primary-400 shadow-lg bg-base-200/50 border border-slate-500/20"
					style={
						{
							"--value": completionPercentage,
							"--size": "12rem",
							"--thickness": "6px",
						} as React.CSSProperties
					}
					role="progressbar"
				>
					<div className="items-center flex flex-col text-3xl">
						{`${completionPercentage}%`}
						<span className="text-sm text-center">Task In progress</span>
					</div>
				</div>

				<div className="grow w-1/2 flex flex-col gap-3">
					<div
						className="flex justify-between border-slate-500/10 border shadow px-4 py-2 rounded-lg"
						onClick={() => {
							setActiveTab("Tasks");
							navigate(siteMap(RouteEnum.Task));
						}}
					>
						<div className="flex flex-col w-full gap-1">
							<div className="flex justify-between items-center">
								<span className="text-xl font-bold mb-2">
									<i className="bi bi-circle-fill me-2 text-primary-400"></i>
									Task
								</span>
								<span className="text-slate-400">
									{activeTaskCount + completedTaskCount}
								</span>
							</div>
							<div className="flex justify-between">
								<span>Active</span>
								<span className="text-slate-400">{activeTaskCount}</span>
							</div>
							<div className="flex justify-between">
								<span>Completed</span>
								<span className="text-slate-400">{completedTaskCount}</span>
							</div>
						</div>
					</div>
					<div
						className="flex justify-between border-slate-500/10 border shadow px-4 py-2 rounded-lg"
						onClick={() => {
							setActiveTab("Offers");
							navigate(siteMap(RouteEnum.MyOffer));
						}}
					>
						<div className="flex flex-col w-full">
							<div className="flex justify-between items-center">
								<span className="text-xl font-bold mb-2">
									<i className="bi bi-circle-fill me-2 text-primary-400"></i>
									Offer
								</span>
								<span className="text-slate-400">{offerCount}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
