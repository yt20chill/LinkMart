import { createContext, useContext } from "react";
export { ControlModalContext, useControlModalContext };

type ControlModalContextType = {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
};

const ControlModalContext = createContext<ControlModalContextType | undefined>(
	undefined
);

const useControlModalContext = () => {
	const controlModal = useContext(ControlModalContext);
	if (!controlModal)
		throw new Error(
			"UseControlModalContext must be used within a ControlModalContext Provider"
		);
	return controlModal;
};
