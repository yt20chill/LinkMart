export { orderStatusTabs, orderStatuses };
export type { BaseButtonProps, OrderStatusTabs };

type BaseButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
};

const orderStatusTabs = ["inProgress", "history"] as const;
type OrderStatusTabs = (typeof orderStatusTabs)[number];

const orderStatuses = Object.freeze([
	"In progress",
	"Shipping",
	"Review",
	"Completed",
]);
