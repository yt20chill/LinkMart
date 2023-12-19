import { BaseButtonProps } from "../../types/sharePropsModel";
const PrimaryButton = ({ label, onClick, className }: BaseButtonProps) => {
  return (
    <button
      className={`min-w-[100px] bg-secondary-400 hover:bg-secondary-500 border-2 border-secondary-400 hover:border-secondary-500 text-white p-1 rounded-btn hover:-translate-y-[0.15rem] hover:ring-4 ring-secondary-400/25 transition-all ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
