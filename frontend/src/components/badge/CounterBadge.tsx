type CounterBadgeProps = {
	count: number;
};

const CounterBadge = ({ count }: CounterBadgeProps) => {
	return (
		<div className="ms-1 text-sm text-center px-3 whitespace-nowrap inline-flex items-center justify-center bg-secondary-400 rounded-badge indent-0 text-white">
			{count}
		</div>
	);
};

export default CounterBadge;
