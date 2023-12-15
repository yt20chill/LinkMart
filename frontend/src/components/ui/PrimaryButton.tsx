import { BaseButtonProps } from "../../types/sharePropsModel";
const PrimaryButton = ({ label, onClick }: BaseButtonProps) => {
	return (
		<button className="btn btn-primary" onClick={onClick}>
			{label}
		</button>
	);
};

export default PrimaryButton;
