import FilterGroup from "../../components/search/FilterGroup";
import { useSearchParamsContext } from "../../services/context/searchParamsContext";
import { useQueryContainer } from "../hooks/useQueryContainer";

export function Filter() {
	const { categories, locations } = useQueryContainer();
	const { setSearchParams } = useSearchParamsContext();
	return (
		<>
			<div className="max-w-full bg-gradient-to-r from-orange-300 to-amber-300/75 text-base-100 shadow">
				<div className="max-w-7xl mx-auto">
					{categories ? (
						<FilterGroup
							displayName="Categories"
							name="category"
							items={categories.map((category) => category.categoryName)}
						/>
					) : (
						<span className="loading loading-dots loading-sm"></span>
					)}
					{locations ? (
						<FilterGroup
							displayName="Countries"
							name="location"
							items={locations.map((location) => location.locationName)}
						/>
					) : (
						<span className="loading loading-dots loading-sm"></span>
					)}
				</div>
				<button
					className="btn btn-outline btn-warning"
					onClick={() => setSearchParams()}
				>
					Clear All
				</button>
			</div>
		</>
	);
}
