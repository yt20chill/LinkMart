import { mapDate } from "@/lib/formattingUtils";
import { twMerge } from "tailwind-merge";
type DateBadgeProps = {
  date: string | Date;
  className?: string;
};
export function DateBadge(props: DateBadgeProps) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 ms-auto text-xs text-gray-400/75 px-2 border-gray-400/25 border rounded-badge",
        props.className ?? ""
      )}
      title={new Date(props.date).toLocaleString().toString()}
    >
      <span className="material-symbols-rounded text-base">schedule</span>
      {mapDate(props.date)}
    </div>
  );
}
