import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type EditButtonProps = {
	label: string;
	onClick: (e: MouseEvent) => void;
	className?: string;
};

const EditButton = ({ label, onClick, className }: EditButtonProps) => {
	return (
		<button
			className={`${twMerge(
				"flex items-center justify-center bg-secondary-400 hover:bg-secondary-500 hover:-translate-y-1 text-white py-1 rounded-btn grow h-12 transition-all hover:ring-4 ring-secondary-200",
				className
			)}`}
			onClick={onClick}
		>
			<span className="material-symbols-rounded text text-lg">edit</span>
			{label}
		</button>
	);
};

export default EditButton;
