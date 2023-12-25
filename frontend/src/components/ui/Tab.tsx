import { camelToTitleCase } from "../../lib/utils";
import { TabContextType } from "../../services/context/TabsContext";

type TabsProps<T extends string[]> = {
  status: T[number];
  label?: string;
  useTabContext: () => TabContextType<T[number]>;
};

const Tab = <T extends string[]>({
  status,
  label = camelToTitleCase(status),
  useTabContext,
}: TabsProps<T>) => {
  const { activeTab, setActiveTab } = useTabContext();
  return (
    <div
      className={`border-b-4 hover:border-primary-300/50 px-12 py-2 capitalize  ${
        activeTab === status ? "border-primary-300" : " border-slate-300/50"
      }`}
      onClick={(e) => {
        e.preventDefault();
        setActiveTab(status);
      }}
    >
      {label}
    </div>
  );
};

export default Tab;
