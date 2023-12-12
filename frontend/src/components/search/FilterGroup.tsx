import { UseSearchParamsWrapperReturnType } from "../../features/hooks/useSearchParamsWrapper";
import FilterKey from "./FilterKey";

type FilterGroupProps = {
	name: string;
	items: string[];
	searchParamsWrapper: UseSearchParamsWrapperReturnType;
};

const FilterGroup = ({
	name,
	items,
	searchParamsWrapper,
}: FilterGroupProps) => {
	if (items.length === 0) return null;
	return (
		<>
			<div>{name}</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				{items.map((item) => (
					<FilterKey
						key={item}
						name={name}
						value={item}
						searchParamsWrapper={searchParamsWrapper}
					/>
				))}
			</ul>
		</>
	);
};

export default FilterGroup;
