import { twMerge } from "tailwind-merge";

type FormSubmitButtonProps<C = unknown, T = unknown> = {
  color?: "primary" | "secondary";
  label?: string;
  className?: string;
  onClick: (
    e?: React.BaseSyntheticEvent<object, C, T> | undefined
  ) => Promise<void>;
  disabled: boolean;
};

// passed onClick here to support multiple form handling
const FormSubmitButton = ({
  color = "secondary",
  label = "Submit",
  onClick,
  disabled = false,
  className = "",
}: FormSubmitButtonProps) => {
  return color === "secondary" ? (
    <button
      className={twMerge(
        "min-w-[100px] bg-secondary-400 border-2 border-secondary-400 text-white py-2 px-4 hover:bg-secondary-500 hover:ring-4 hover:-translate-y-[2px] transition-all ring-secondary-400/25 rounded-btn",
        className ?? ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {disabled && <span className="loading loading-spinner loading-md"></span>}
    </button>
  ) : (
    <button
      className={twMerge(
        "min-w-[100px] bg-primary-400 border-2 border-primary-400 text-white py-2 px-4 hover:bg-primary-500 hover:ring-4 hover:-translate-y-[2px] transition-all ring-primary-400/25 rounded-btn",
        className ?? ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {disabled && <span className="loading loading-spinner loading-md"></span>}
    </button>
  );
};

export default FormSubmitButton;
