import { imageHoverEnd, imageHoverView } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

type MainImageFrameProps = {
  title?: string;
  className?: string;
  imagePath: string;
};

export function MainImageFrame(props: MainImageFrameProps) {
  return (
    <div
      className={twMerge(
        "relative flex justify-center aspect-square w-full overflow-hidden rounded-sm bg-slate-300 border border-white/10 ring-1 ring-black/10",
        props.className ?? ""
      )}
    >
      <img
        title={props.title}
        className="object-cover hover:object-contain origin-top-left"
        src={props.imagePath}
        onMouseMove={(e) => imageHoverView(e)}
        onMouseLeave={(e) => imageHoverEnd(e)}
      />
    </div>
  );
}
