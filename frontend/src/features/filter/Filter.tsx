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
        className="btn btn-outline btn-warning w-full"
        onClick={() => setSearchParams()}
      >
        Clear All
      </button>
    </div>
  );
}
