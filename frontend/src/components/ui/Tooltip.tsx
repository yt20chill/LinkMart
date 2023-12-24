type TooltipProps = {
	children: React.ReactNode;
	message: string;
};
const Tooltip = ({ children, message }: TooltipProps) => {
	return (
		<div className="tooltip flex grow" data-tip={message}>
			{children}
		</div>
	);
};

export default Tooltip;
