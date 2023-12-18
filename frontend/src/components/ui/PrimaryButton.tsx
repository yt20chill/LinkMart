import { BaseButtonProps } from "../../types/sharePropsModel";
const PrimaryButton = ({ label, onClick, className }: BaseButtonProps) => {
  return (
    <button
      className={`min-w-[100px] bg-secondary-400 border-2 border-secondary-400 text-white p-1 rounded-btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
