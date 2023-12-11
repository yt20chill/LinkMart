import { Link } from "react-router-dom";

export type TabItem = {
  id: number;
  itemIcon: string;
  itemName: string;
  itemLink: string;
};
export type FilterTabProps = {
  tabIcon: string;
  tabName: string;
  tabItemList: TabItem[];
};

export function FilterTab(props: FilterTabProps) {
  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="flex justify-center items-center w-52 py-5 focus:bg-orange-200/50 hover:bg-orange-200/50 hover:text-orange-700 backdrop-blur"
      >
        <span className="material-symbols-rounded me-1">{props.tabIcon}</span>
        {props.tabName}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow bg-orange-200/20 backdrop-blur-xl w-52 mt-1 rounded-lg"
      >
        {props.tabItemList.map((item) => (
          <li key={item.id}>
            <Link
              to={item.itemLink}
              className="bg-transparent hover:bg-base-100/50 hover:scale-95 transition-all flex items-center rounded-md p-2 text-orange-950 hover:text-orange-500"
            >
              <b className="emo me-1 text-lg">{item.itemIcon}</b>{" "}
              {item.itemName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
