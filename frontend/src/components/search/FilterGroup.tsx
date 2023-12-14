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
      <div className="truncate">{displayName}</div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
      >
        {filterKeys}
      </ul>
    </>
  );
};

export default FilterGroup;
