import { useMemo } from "react";
import FilterGroup from "../../components/search/FilterGroup";
import { useSearchParamsContext } from "../../services/context/SearchParamsWrapperContext";
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
    <div className={`ml-3 ${props.className}`}>
      <div className="">
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
        className="rounded-box py-2 shadow hover:shadow-lg w-full overflow-hidden transition-all bg-primary-400 hover:-translate-y-1 hover:bg-slate-200 text-white border border-slate-200 hover:text-primary-400 hover:ring-2 ring-primary-500/75 ring-offset-2"
        onClick={() => setSearchParams()}
      >
        Clear All
      </button>
    </div>
  );
}
