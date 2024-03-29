import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { useControlModalContext } from "@/services/context/ControlModalContext";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { useShallow } from "zustand/react/shallow";
import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetProviderProfileDto } from "../../schemas/responseSchema";
import NoReviewsDisplay from "./NoReviewsDisplay";

type ProviderInfoDisplayProps = {
	dto: Omit<GetProviderProfileDto, "reviews">;
};

const ProviderInfoDisplay = ({
	dto: {
		providerName,
		starOfAttitude,
		starOfEfficiency,
		biography,
		numberOfReviews,
	},
}: ProviderInfoDisplayProps) => {
	const { username, role } = useAuthStore(
		useShallow((state) => ({ username: state.username, role: state.role }))
	);
	const { setIsShow } = useControlModalContext();
	return (
		<div className="flex flex-col p-6 bg-base-100 rounded-xl mb-6 sm:border border-slate-500/20 sm:mx-6">
			<div className="flex gap-1 items-center">
				<IconCircleFrame username={providerName} className="w-16 h-16" />
				<div className="flex flex-col text-3xl ">
					<span className="text-sm text-gray-400 indent-1">Provider</span>
					{providerName}
				</div>
			</div>
			<div className="flex items-center p-4 gap-6 w-max rounded-xl">
				<img
					src="/image/tags/tag_like_side.png"
					className="w-20 h-20 bg-gray-400/20 rounded-lg p-2"
				/>
				{numberOfReviews > 0 ? (
					<>
						<div className="flex flex-col">
							<h2 className="text-3xl">{starOfEfficiency.toFixed(1)}</h2>
							<div className="text-xs text-base-content">Efficiency</div>
							<div>
								<Rating size="sm" score={starOfEfficiency} />
							</div>
						</div>
						<div className="flex flex-col">
							<h2 className="text-3xl">{starOfAttitude.toFixed(1)}</h2>
							<div className="text-xs text-base-content">Attitude</div>
							<div>
								<Rating size="sm" score={starOfAttitude} />
							</div>
						</div>
					</>
				) : (
					<NoReviewsDisplay />
				)}
			</div>
			<div className="flex gap-2 text-primary-400 ps-2 font-bold">
				Bio
				{role === AuthorizeLevels.PROVIDER && providerName === username && (
					<span
						className="text-gray-400 transition grid place-items-center rounded-full text-base-gray-400 hover:bg-gray-500/50 hover:-translate-y-[1px] hover:text-base-content/80 overflow-hidden w-6 h-6 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							setIsShow(true);
						}}
					>
						<span className="material-symbols-rounded text-sm">edit</span>
					</span>
				)}
			</div>
			<p className="p-3 mb-6 bg-base-200/80 rounded-lg">
				{biography ? biography : `Hello. I am ${providerName}`}
			</p>
		</div>
	);
};

export default ProviderInfoDisplay;
