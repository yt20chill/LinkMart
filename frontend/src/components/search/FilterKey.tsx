import { useState } from "react";
import { UseSearchParamsWrapperReturnType } from "../../features/hooks/useSearchParamsWrapper";

type FilterKeyProps = {
	name: string;
	value: string;
	searchParamWrapper: UseSearchParamsWrapperReturnType;
};

const FilterKey = ({ name, value, searchParamWrapper }: FilterKeyProps) => {
	const { hasSearchParams, toggleSearchParams } = searchParamWrapper;
	const [isChecked, setIsChecked] = useState<boolean>(
		hasSearchParams(name, value)
	);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		toggleSearchParams(name, value);
	};
	return (
		<div className="form-control">
			<label className="label cursor-pointer">
				<span className="label-text">{value}</span>
				<input
					type="checkbox"
					className="checkbox checkbox-primary"
					checked={isChecked}
					onChange={onChange}
				/>
			</label>
		</div>
	);
};

export default FilterKey;
