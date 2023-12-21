import { twMerge } from "tailwind-merge";
import { BaseButtonProps } from "../../types/sharePropsModel";

const CancelButton = ({ label, onClick, className }: BaseButtonProps) => {
  return (
    <button
      className={twMerge(
        "min-w-[100px] bg-transparent border border-slate-400 hover:border-secondary-400 hover:text-secondary-400 text-slate-400 p-1 rounded-btn hover:-translate-y-[0.15rem] hover:ring-4 ring-secondary-400/25 transition-all",
        className ?? ""
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CancelButton;
