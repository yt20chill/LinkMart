import { twMerge } from "tailwind-merge";

type PriceDisplayProps = {
  badge?: boolean;
  badgeContent?: string;
  price: number | null;
  className?: string;
};
export function PriceDisplay(props: PriceDisplayProps) {
  return (
    <>
      {props.badge && (
        <div className="inline-flex px-2 rounded-badge text-slate-400 bg-slate-200 text-sm me-2">
          {props.badgeContent}
        </div>
      )}
      {props.price ? (
        <span
          className={twMerge(
            "text-3xl tracking-tighter",
            props.className ?? ""
          )}
        >
          <span className="text-base">HK $</span>
          {props.price.toLocaleString("en")}
        </span>
      ) : (
        <span className="">Please Offer</span>
      )}
    </>
  );
}
