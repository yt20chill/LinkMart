import { MouseEvent } from "react";

export type { BaseButtonProps };

type BaseButtonProps = {
	label: string;
	onClick: (e: MouseEvent) => void;
};
