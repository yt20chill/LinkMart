import { memo, useState } from "react";
import { FilterKeyProps } from "../../types/sharePropsModel";

export const FilterKey = ({
	name,
	value,
	searchParamsWrapper,
}: FilterKeyProps) => {
	const { hasSearchParams, toggleSearchParams } = searchParamsWrapper;
	const [isChecked, setIsChecked] = useState<boolean>(
		hasSearchParams(name, value)
	);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		toggleSearchParams(name, value);
	};
	return (
		<li className="form-control">
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

export default memo(FilterKey);
