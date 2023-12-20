export { orderStatusTabs, orderStatuses, userInfoTabs };
export type { BaseButtonProps, OrderStatusTabs, UserInfoTabs };

type BaseButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
};

const orderStatusTabs = Object.freeze(["inProgress", "history"]);
type OrderStatusTabs = (typeof orderStatusTabs)[number];

const orderStatuses = Object.freeze([
	"In progress",
	"Shipping",
	"Review",
	"Completed",
]);

const userInfoTabs = Object.freeze(["General", "Address"]);
type UserInfoTabs = (typeof userInfoTabs)[number];
