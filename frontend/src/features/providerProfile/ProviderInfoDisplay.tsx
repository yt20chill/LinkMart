import { useAuthStore } from "@/services/stores/authStore";
import { AuthorizeLevels } from "@/types/authModels";
import { useShallow } from "zustand/react/shallow";
import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetProviderProfileDto } from "../../schemas/responseSchema";
import { useControlModalContext } from "@/services/context/ControlModalContext";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";

type ProviderInfoDisplayProps = {
  dto: Omit<GetProviderProfileDto, "reviews">;
};

const ProviderInfoDisplay = ({
  dto: {
    username: providerUsername,
    totalReviews,
    averageAttitude,
    averageEfficiency,
    biography,
  },
}: ProviderInfoDisplayProps) => {
  const { username, role } = useAuthStore(
    useShallow((state) => ({ username: state.username, role: state.role }))
  );
  const { setIsShow } = useControlModalContext();
  return (
    <div className="flex flex-col p-6 bg-base-100 rounded-xl mb-6">
      <div className="flex gap-1 items-center mb-6">
        <IconCircleFrame username={providerUsername} className="w-24 h-24" />
        <div className="flex flex-col text-3xl ">
          <span className="text-sm text-gray-400 indent-1 ">Provider</span>
          {providerUsername}
        </div>
      </div>
      <div className="flex gap-2 text-gray-400">
        Bio
        {role === AuthorizeLevels.PROVIDER && providerUsername === username && (
          <span
            className="transition grid place-items-center rounded-full text-base-gray-400 hover:bg-gray-500/50 hover:-translate-y-[1px] hover:text-base-content/80 overflow-hidden w-6 h-6 cursor-pointer"
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
      <div className="text-gray-400 mb-1">Rating ({totalReviews})</div>
      <div className="grid grid-cols-2 items-center p-4 gap-1 w-max bg-base-200/80 rounded-xl">
        <div className="uppercase font-bold text-primary-400">
          <i className="bi bi-bookmark-star-fill me-1"></i>Efficiency
        </div>
        <div>
          <Rating size="md" name="" score={averageEfficiency} />
        </div>
        <div className="uppercase font-bold text-primary-400">
          <i className="bi bi-bookmark-star-fill me-1 uppercase"></i>Attitude
        </div>
        <div>
          <Rating size="md" name="" score={averageAttitude} />
        </div>
      </div>
    </div>
  );
};

export default ProviderInfoDisplay;
