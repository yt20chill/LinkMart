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
      <div className="truncate indent-2 mb-1 text-slate-400 font-roboto flex items-center">
        <i className="material-symbols-rounded text-base font-bold">
          filter_none
        </i>
        {displayName}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow bg-base-100/75 backdrop-blur-lg rounded-box transition-all border-2 border-base-100 mb-3"
      >
        {filterKeys}
      </ul>
    </>
  );
};

export default FilterGroup;
