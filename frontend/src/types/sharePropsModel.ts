export { orderStatusTabs, orderStatuses, userInfoTabs };
export type {
	BaseButtonProps,
	BaseOrderActionProps,
	OrderStatusTabs,
	OrderStatuses,
	UserInfoTabs,
};

type BaseButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
	icon?: string;
};

const orderStatusTabs = ["inProgress", "complete"] as const;
type OrderStatusTabs = (typeof orderStatusTabs)[number];

const orderStatuses = [
	"In Progress",
	"Shipped",
	"Completed",
	"Reviewed",
] as const;

type OrderStatuses = (typeof orderStatuses)[number];

const userInfoTabs = ["General", "Address", "Provider Application"] as const;
type UserInfoTabs = (typeof userInfoTabs)[number];

type BaseOrderActionProps = {
	orderId: string;
};
