export { orderStatusTabs, orderStatuses, userInfoTabs };
export type { BaseButtonProps, OrderStatusTabs, OrderStatuses, UserInfoTabs };

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
  "In progress",
  "Shipping",
  "Review",
  "Completed",
] as const;

type OrderStatuses = (typeof orderStatuses)[number];

const userInfoTabs = ["General", "Address"] as const;
type UserInfoTabs = (typeof userInfoTabs)[number];
