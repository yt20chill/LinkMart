import FilterGroup from "../../components/search/FilterGroup";
import { useQueryContainer } from "../hooks/useQueryContainer";
import { UseSearchParamsWrapperReturnType } from "../hooks/useSearchParamsWrapper";

type FilterProps = {
	searchParamsWrapper: UseSearchParamsWrapperReturnType;
};

export function Filter({ searchParamsWrapper }: FilterProps) {
	const { categories, locations } = useQueryContainer();

	return (
		<>
			<div className="max-w-full bg-gradient-to-r from-orange-300 to-amber-300/75 text-base-100 shadow">
				<div className="max-w-7xl mx-auto">
					{categories ? (
						<FilterGroup
							searchParamsWrapper={searchParamsWrapper}
							name="Categories"
							items={categories.map((category) => category.categoryName)}
						/>
					) : (
						<span className="loading loading-dots loading-sm"></span>
					)}
					{locations ? (
						<FilterGroup
							searchParamsWrapper={searchParamsWrapper}
							name="Countries"
							items={locations.map((location) => location.locationName)}
						/>
					) : (
						<span className="loading loading-dots loading-sm"></span>
					)}
				</div>
			</div>
		</>
	);
}
