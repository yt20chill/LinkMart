import { useSearchParams } from "react-router-dom";
import { CategoryDto, LocationDto } from "../../schemas/responseSchema";
import { FilterTab } from "./FilterTab";

const categories: CategoryDto[] = [
  {
    categoryId: 1,
    categoryName: "Clothes",
  },
  {
    categoryId: 2,
    categoryName: "Figure",
  },
];
const locations: LocationDto[] = [
  {
    locationId: 1,
    locationName: "Japan",
  },
  {
    locationId: 2,
    locationName: "Korea",
  },
];

export function Filter() {
  // const { data: categories } = useQueryContainer().getAllCategories;
  // const { data: locations } = useQueryContainer().getAllLocations;
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (queryParam: string, value: string) => {
    searchParams.has(queryParam) &&
    searchParams.get(queryParam) === value.toLowerCase().trim()
      ? searchParams.delete(queryParam, value.toLowerCase().trim())
      : searchParams.append(queryParam, value.toLowerCase().trim());

    return setSearchParams(searchParams);
  };

  return (
    <>
      <div className="max-w-full bg-gradient-to-r from-orange-300 to-amber-300/75 text-base-100 shadow">
        <div className="max-w-7xl mx-auto">
          {categories ? (
            <FilterTab
              tabName="Category"
              tabIcon="category"
              filterKey="category"
              onClick={onClick}
              tabItemList={categories.map((category) => ({
                id: category.categoryId,
                name: category.categoryName,
              }))}
            />
          ) : (
            <div className="skeleton w-32 h-32"></div>
          )}
          {locations ? (
            <FilterTab
              tabName="Country"
              tabIcon="public"
              filterKey="location"
              onClick={onClick}
              tabItemList={locations.map((location) => ({
                id: location.locationId,
                name: location.locationName,
              }))}
            />
          ) : (
            <div className="skeleton w-32 h-32"></div>
          )}
        </div>
      </div>
    </>
  );
}
