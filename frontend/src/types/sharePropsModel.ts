export type { BaseButtonProps };

type BaseButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
};
