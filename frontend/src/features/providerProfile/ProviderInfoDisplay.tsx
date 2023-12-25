import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { useControlModalContext } from "@/services/context/ControlModalContext";
import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { useShallow } from "zustand/react/shallow";
import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetProviderProfileDto } from "../../schemas/responseSchema";

type ProviderInfoDisplayProps = {
	dto: Omit<GetProviderProfileDto, "reviews">;
};

const ProviderInfoDisplay = ({
	dto: {
		username: providerUsername,
		starOfAttitude,
		starOfEfficiency,
		biography,
	},
}: ProviderInfoDisplayProps) => {
	const { username, role } = useAuthStore(
		useShallow((state) => ({ username: state.username, role: state.role }))
	);
	const { setIsShow } = useControlModalContext();
	return (
		<div className="flex flex-col p-6 bg-base-100 rounded-xl mb-6 border border-slate-500/20">
			<div className="flex gap-1 items-center">
				<IconCircleFrame username={providerUsername} className="w-16 h-16" />
				<div className="flex flex-col text-3xl ">
					<span className="text-sm text-gray-400 indent-1">Provider</span>
					{providerUsername}
				</div>
			</div>
			<div className="flex items-center p-4 gap-6 w-max rounded-xl">
				<img
					src="/image/tags/tag_like_side.png"
					className="w-20 h-20 bg-gray-400/20 rounded-lg p-2"
				/>
				<div className="flex flex-col">
					<h2 className="text-3xl">{starOfEfficiency.toFixed(1)}</h2>
					<div className="text-xs text-base-content">Efficiency</div>
					<div>
						<Rating size="sm" name="" score={starOfEfficiency} />
					</div>
				</div>
				<div className="flex flex-col">
					<h2 className="text-3xl">{starOfAttitude.toFixed(1)}</h2>
					<div className="text-xs text-base-content">Attitude</div>
					<div>
						<Rating size="sm" name="" score={starOfAttitude} />
					</div>
				</div>
			</div>
			<div className="flex gap-2 text-primary-400 ps-2 font-bold">
				Bio
				{role === AuthorizeLevels.PROVIDER && providerUsername === username && (
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
			{biography && (
				<p className="p-3 mb-6 bg-base-200/80 rounded-lg">{biography}</p>
			)}
		</div>
	);
};

export default ProviderInfoDisplay;
