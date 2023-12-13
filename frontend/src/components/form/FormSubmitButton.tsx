type FormSubmitButtonProps = {
	label: string;
	onClick: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined
	) => Promise<void>;
};

const FormSubmitButton = ({ label, onClick }: FormSubmitButtonProps) => {
	return (
		<button className="btn btn-warning" onClick={onClick}>
			{label}
		</button>
	);
};

export default FormSubmitButton;
