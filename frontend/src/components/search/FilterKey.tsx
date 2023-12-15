import { useEffect, useState } from "react";
import { useSearchParamsContext } from "../../services/context/searchParamsContext";

export type FilterKeyProps = {
  name: string;
  value: string;
};

export const FilterKey = ({ name, value }: FilterKeyProps) => {
  const { hasSearchParams, toggleSearchParams, searchParams } =
    useSearchParamsContext();
  const [isChecked, setIsChecked] = useState<boolean>(
    hasSearchParams(name, value)
  );
  useEffect(() => {
    hasSearchParams(name, value) ? setIsChecked(true) : setIsChecked(false);
  }, [searchParams, name, value, hasSearchParams]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    toggleSearchParams(name, value);
  };
  return (
    <li className="form-control w-full">
      <label className="label cursor-pointer">
        <span className="label-text">{value}</span>
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={isChecked}
          onChange={onChange}
        />
      </label>
    </li>
  );
};

export default FilterKey;
