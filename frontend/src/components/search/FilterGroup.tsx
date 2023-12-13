import FilterKey from "./FilterKey";

type FilterGroupProps = {
	displayName: string;
	name: string;
	items: string[];
};

const FilterGroup = ({ displayName, name, items }: FilterGroupProps) => {
	if (items.length === 0) return null;
	return (
		<>
			<div>{displayName}</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{items.map((item) => (
					<FilterKey key={item} name={name} value={item} />
				))}
			</ul>
		</>
	);
};

export default FilterGroup;
