import { FilterTab, TabItem } from "./FilterTab";
import { useState } from "react";

const initCategoryList: TabItem[] = [
  {
    id: 1,
    itemIcon: "👕",
    itemName: "Clothes",
    itemLink: "/",
  },
  {
    id: 2,
    itemIcon: "🤖",
    itemName: "Figure",
    itemLink: "/",
  },
];
const initCountryList: TabItem[] = [
  {
    id: 1,
    itemIcon: "🇯🇵",
    itemName: "Japan",
    itemLink: "/",
  },
  {
    id: 2,
    itemIcon: "🇰🇷",
    itemName: "Korea",
    itemLink: "/",
  },
];

export function Filter() {
  const [categoryList] = useState<TabItem[]>(initCategoryList);
  const [countryList] = useState<TabItem[]>(initCountryList);
  return (
    <div className="max-w-full bg-gradient-to-r from-orange-300 to-amber-300/75 text-base-100 shadow">
      <div className="max-w-7xl mx-auto">
        <FilterTab
          tabName="Category"
          tabIcon="category"
          tabItemList={categoryList}
        />
        <FilterTab
          tabName="Country"
          tabIcon="public"
          tabItemList={countryList}
        />
      </div>
    </div>
  );
}
