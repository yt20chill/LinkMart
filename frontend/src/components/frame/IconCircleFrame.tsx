import { iconStyleEnum, mapIconUrl } from "@/lib/utils";
type IconCircleFrameProps = {
  username: string;
  className?: string;
  iconType?: iconStyleEnum;
};
export function IconCircleFrame(props: IconCircleFrameProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-full bg-slate-300 w-8 h-8 me-2 text-white border-white/50 border-2 overflow-hidden ${props.className}`}
    >
      <img
        src={mapIconUrl(props.username, props.iconType)}
        title={props.username}
      />
    </div>
  );
}
