type ExpandButtonProps = {
	isExpanded: boolean;
	setIsExpanded: (isExpanded: boolean) => void;
};

const ExpandButton = ({ isExpanded, setIsExpanded }: ExpandButtonProps) => {
	return (
		<button
			className="fixed left-0 top-1/2 z-20 hidden max-lg:block bg-primary-400 hover:bg-primary-500 text-white font-bold p-2 rounded-r-full  shadow-md backdrop-blur-xl ring-offset-0 hover:shadow-lg hover:-translate-y-1 hover:ring-primary-300 hover:ring-2 hover:ring-offset-2 transition-all duration-500 h-28"
			onClick={(e) => {
				e.preventDefault();
				setIsExpanded(!isExpanded);
			}}
		>
			{isExpanded ? (
				<i className="bi bi-caret-left-fill"></i>
			) : (
				<i className="bi bi-caret-right-fill"></i>
			)}
		</button>
	);
};

export default ExpandButton;
