import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
	ProviderTabContext,
	useProviderTabContext,
} from "../../services/context/TabsContext";
import { ProviderTabs, providerTabs } from "../../services/routes.config";
import NavTab from "./NavTab";

const ProviderLayout = () => {
	const [activeTab, setActiveTab] = useState<ProviderTabs>("Offers");
	return (
		<>
			<ProviderTabContext.Provider value={{ activeTab, setActiveTab }}>
				<NavTab tabs={providerTabs} useTabContext={useProviderTabContext} />
				<Outlet />
			</ProviderTabContext.Provider>
		</>
	);
};

export default ProviderLayout;
