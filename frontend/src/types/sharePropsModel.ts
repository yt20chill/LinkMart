export { orderStatusTabs, orderStatuses, userInfoTabs };
export type { BaseButtonProps, OrderStatusTabs, UserInfoTabs };

type BaseButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
};

const orderStatusTabs = ["inProgress", "complete"] as const;
type OrderStatusTabs = (typeof orderStatusTabs)[number];

const orderStatuses = [
	"In progress",
	"Shipping",
	"Review",
	"Completed",
] as const;

const userInfoTabs = ["General", "Address"] as const;
type UserInfoTabs = (typeof userInfoTabs)[number];
