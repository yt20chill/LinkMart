import { BaseButtonProps } from "../../types/sharePropsModel";

const CancelButton = ({ label, onClick, className = "" }: BaseButtonProps) => {
	return (
		<div className={className}>
			<button className="btn btn-active btn-secondary" onClick={onClick}>
				{label}
			</button>
		</div>
	);
};

export default CancelButton;
