import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ignoreCaseAndPlural } from "../../lib/formattingUtils";
import {
  ProviderTabContext,
  TabContextType,
  useProviderTabContext,
} from "../../services/context/TabsContext";
import { ProviderTabs, providerTabs } from "../../services/routes.config";
import NavTab from "./NavTab";

const ProviderLayout = () => {
  const initialTab =
    ignoreCaseAndPlural<ProviderTabs>(
      window.location.pathname.split("/").at(-1),
      Object.keys(providerTabs) as ProviderTabs[]
    ) ?? (Object.keys(providerTabs)[0] as ProviderTabs);
  const [activeTab, setActiveTab] = useState<ProviderTabs>(initialTab);
  return (
    <>
      <ProviderTabContext.Provider value={{ activeTab, setActiveTab }}>
        <div className="flex grow">
          <NavTab
            tabs={providerTabs}
            useTabContext={
              useProviderTabContext as () => TabContextType<string>
            }
          />
          <div className="mx-auto max-w-5xl w-full overflow-hidden">
            <Outlet />
          </div>
          <div className="hidden lg:block ms-6"></div>
        </div>
      </ProviderTabContext.Provider>
    </>
  );
};

export default ProviderLayout;
