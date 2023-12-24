import { twMerge } from "tailwind-merge";

type AnimatedBG = {
  className?: string;
};
export function AnimatedBG(props: AnimatedBG) {
  return (
    <div
      className={twMerge(
        "overflow-hidden fixed inset-0 -z-50 w-screen",
        props.className ?? ""
      )}
    >
      <img
        src="/image/BG-1.jpeg"
        className="object-cover blur-3xl scale-150 select-none pointer-events-none h-full w-screen brightness-150"
        title="LinkMart"
      />
    </div>
  );
}
