import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterKeyProps = {
	name: string;
	value: string;
};

const FilterKey = ({ name, value }: FilterKeyProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	// only modify searchParams. Manage fetch data on the page component
	useEffect(() => {}, [isChecked]);
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<div className="form-control">
			<label className="label cursor-pointer">
				<span className="label-text">{value}</span>
				<input
					type="checkbox"
					className="checkbox checkbox-primary"
					checked={isChecked}
					onClick={() => setIsChecked(!isChecked)}
				/>
			</label>
		</div>
	);
};

export default FilterKey;
