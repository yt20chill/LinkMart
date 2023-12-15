import { useMemo } from "react";
import FilterGroup from "../../components/search/FilterGroup";
import { useSearchParamsContext } from "../../services/context/searchParamsContext";
import { useQueryContainer } from "../hooks/useQueryContainer";

type FilterProps = {
  className?: string;
};
export function Filter(props: FilterProps) {
  const { categories, locations } = useQueryContainer();
  const locationsName = useMemo(
    () => locations?.map((location) => location.locationName),
    [locations]
  );
  const categoriesName = useMemo(
    () => categories?.map((category) => category.categoryName),
    [categories]
  );
  const { setSearchParams } = useSearchParamsContext();
  return (
    <div className={`${props.className}`}>
      <div className="mb-4">
        {categoriesName ? (
          <FilterGroup
            displayName="Categories"
            name="category"
            items={categoriesName}
          />
        ) : (
          <span className="loading loading-dots loading-sm"></span>
        )}
        {locationsName ? (
          <FilterGroup
            displayName="Countries"
            name="location"
            items={locationsName}
          />
        ) : (
          <span className="loading loading-dots loading-sm"></span>
        )}
      </div>
      <button
        className="rounded-box py-2 shadow hover:shadow-lg hover:ring-2 hover:ring-orange-300 hover:ring-offset-2 bg-orange-400 hover:bg-orange-400 text-base-100 hover:text-lg w-full overflow-hidden transition-all"
        onClick={() => setSearchParams()}
      >
        Clear All
      </button>
    </div>
  );
}
