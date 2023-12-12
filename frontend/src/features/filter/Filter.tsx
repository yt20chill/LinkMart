import { useSearchParams } from "react-router-dom";
import FilterGroup from "../../components/search/FilterGroup";
import { CategoryDto, LocationDto } from "../../schemas/responseSchema";
import { useQueryContainer } from "../hooks/useQueryContainer";
import { useSearchParamsWrapper } from "../hooks/useSearchParamsWrapper";

const categories: CategoryDto[] = [
	{
		categoryId: 1,
		categoryName: "Clothes",
	},
	{
		categoryId: 2,
		categoryName: "Figure",
	},
];
const locations: LocationDto[] = [
	{
		locationId: 1,
		locationName: "Japan",
	},
	{
		locationId: 2,
		locationName: "Korea",
	},
];

export function Filter() {
	const { categories, locations } = useQueryContainer();
	const searchParamsWrapper = useSearchParamsWrapper(useSearchParams());

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
