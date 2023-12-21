import { twMerge } from "tailwind-merge";

type PillBadgeProps = {
  content: string;
  className?: string;
};
export function PillBadge(props: PillBadgeProps) {
  return (
    <>
      <span
        className={twMerge(
          "badge text-xs text-slate-400",
          props.className ?? ""
        )}
      >
        {props.content}
      </span>
    </>
  );
}
