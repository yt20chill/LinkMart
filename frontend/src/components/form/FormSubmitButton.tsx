type FormSubmitButtonProps = {
	label: string;
	onClick: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined
	) => Promise<void>;
	disabled: boolean;
};

// passed onClick here to support multiple form handling
const FormSubmitButton = ({
	label,
	onClick,
	disabled = false,
}: FormSubmitButtonProps) => {
	return (
		<button className="btn btn-warning" onClick={onClick} disabled={disabled}>
			{label}
			{disabled && <span className="loading loading-spinner loading-md"></span>}
		</button>
	);
};

export default FormSubmitButton;
