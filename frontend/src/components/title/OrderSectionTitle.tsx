import { toggleElement } from "@/lib/utils";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type OrderSectionTitleProps = {
  label: string;
  className?: string;
};
export function OrderSectionTitle(props: OrderSectionTitleProps) {
  const [isExpand, setIsExpand] = useState(props.className?.includes("active"));
  return (
    <div
      className={twMerge(
        "w-full  px-6 py-2 text text-slate-500 tracking-tight flex items-center bg-base-100",
        props.className ?? ""
      )}
      onClick={(e) => {
        toggleElement(e);
        setIsExpand(!isExpand);
      }}
    >
      {isExpand ? (
        <i className="bi bi-dash-lg me-2"></i>
      ) : (
        <i className="bi bi-plus-lg me-2"></i>
      )}

      {props.label}
    </div>
  );
}
