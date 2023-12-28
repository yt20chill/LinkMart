import { useMemo } from "react";
import FilterKey from "./FilterKey";

type FilterGroupProps = {
  displayName: string;
  name: string;
  items: string[];
};

const FilterGroup = ({ displayName, name, items }: FilterGroupProps) => {
  const filterKeys = useMemo(
    () =>
      items.map((item) => <FilterKey key={item} name={name} value={item} />),
    [items, name]
  );
  if (filterKeys.length === 0) return null;
  return (
    <>
      <div className="truncate indent-2 mb-1 text-base-content/75  font-roboto flex items-center">
        <i className="material-symbols-rounded text-base font-bold">
          filter_none
        </i>
        {displayName}
      </div>
      <div className="max-h-96 overflow-scroll no-scrollbar rounded-lg shadow relative w-full bg-base-100">
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] p-2 bg-base-100/75 backdrop-blur-lg rounded-box transition-all border-2 border-base-100 mb-3"
        >
          {filterKeys}
        </ul>
        <div className="sticky bottom-0 left-0 bg-gradient-to-t from-base-300/50 to-base-100/0  h-12 pointer-events-none w-full"></div>
      </div>
    </>
  );
};

export default FilterGroup;
