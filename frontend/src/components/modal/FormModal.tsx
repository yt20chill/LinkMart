import { ReactNode } from "react";

type FormModalProps = {
	children: ReactNode;
};

const FormModal = ({ children }: FormModalProps) => {
	return (
		<div className="flex items-center justify-center inset-0 fixed">
			<div className="flex flex-col w-96 bg-base-100 p-10 rounded-3xl shadow">
				<>{children}</>
			</div>
		</div>
	);
};

export default FormModal;
