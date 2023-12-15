import { BaseButtonProps } from "../../types/sharePropsModel";

const CancelButton = ({ label, onClick }: BaseButtonProps) => {
	return (
		<button className="btn btn-active btn-secondary mt-5" onClick={onClick}>
			{label}
		</button>
	);
};

export default CancelButton;
