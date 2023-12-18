type FormSubmitButtonProps<C = unknown, T = unknown> = {
  label: string;
  className?: string;
  onClick: (
    e?: React.BaseSyntheticEvent<object, C, T> | undefined
  ) => Promise<void>;
  disabled: boolean;
};

// passed onClick here to support multiple form handling
const FormSubmitButton = ({
  label,
  onClick,
  disabled = false,
  className = "",
}: FormSubmitButtonProps) => {
  return (
    <button
      className={`min-w-[100px] bg-secondary-400 border-2 border-secondary-400 text-white py-2 px-4 rounded-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {disabled && <span className="loading loading-spinner loading-md"></span>}
    </button>
  );
};

export default FormSubmitButton;
