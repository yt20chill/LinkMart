import { useSearchParams } from "react-router-dom";
import FilterKey from "../../components/search/FilterKey";
import { useSearchParamsWrapper } from "../hooks/useSearchParamsWrapper";

const test = { name: "category", value: "category1" };
const test2 = { name: "category", value: "category2" };

const FilterDrawer = () => {
	const searchParamWrapper = useSearchParamsWrapper(useSearchParams());
	return (
		<>
			<FilterKey searchParamWrapper={searchParamWrapper} {...test} />
			<FilterKey searchParamWrapper={searchParamWrapper} {...test2} />
		</>
	);
};

export default FilterDrawer;
