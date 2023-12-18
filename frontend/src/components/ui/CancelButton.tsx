import { BaseButtonProps } from "../../types/sharePropsModel";

const CancelButton = ({ label, onClick, className }: BaseButtonProps) => {
  return (
    <button
      className={`min-w-[100px] bg-transparent border-2 border-slate-400 text-slate-400 p-1 rounded-btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CancelButton;
