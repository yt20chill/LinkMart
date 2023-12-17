import { ReactNode } from "react";
import { useControlModalContext } from "../../services/context/closeModalContext";

type FormModalProps = {
	children: ReactNode;
};

const FormModal = ({ children }: FormModalProps) => {
	const { isShow, setIsShow } = useControlModalContext();
	return (
		isShow && (
			<div className="flex items-center justify-center inset-0 fixed select-none pointer-events-none bg-black/50">
				<div className="flex flex-col w-96 bg-base-100 p-10 rounded-3xl shadow select-all pointer-events-auto relative">
					<button
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						onClick={() => {
							setIsShow(false);
						}}
					>
						✕
					</button>
					<>{children}</>
				</div>
			</div>
		)
	);
};

export default FormModal;
