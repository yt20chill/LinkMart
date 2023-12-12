import FilterKey from "../../components/search/FilterKey";

const test = { name: "category", value: "test" };

const FilterDrawer = () => {
	return <FilterKey {...test} />;
};

export default FilterDrawer;
