import { twMerge } from "tailwind-merge";

type CounterBadgeProps = {
  count: number | string;
  bootstrapIcon?: string;
  className?: string;
};

const CounterBadge = ({
  count,
  bootstrapIcon,
  className,
}: CounterBadgeProps) => {
  return (
    <div
      className={twMerge(
        "ms-1 text-sm text-center px-3 whitespace-nowrap inline-flex items-center justify-center shadow bg-emerald-500 rounded-badge indent-0 text-white",
        className ?? ""
      )}
    >
      {bootstrapIcon && <i className={`bi me-1 ${bootstrapIcon}`}></i>}
      {count}
    </div>
  );
};

export default CounterBadge;
