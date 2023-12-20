import { useState } from "react";
import {
	ProviderTabContext,
	useProviderTabContext,
} from "../../services/context/TabsContext";
import { ProviderTabs, providerTabs } from "../../services/routes.config";
import NavTab from "./NavTab";

type ProviderLayoutProps = {
	children: React.ReactNode;
};

const ProviderLayout = ({ children }: ProviderLayoutProps) => {
	const [activeTab, setActiveTab] = useState<ProviderTabs>("Offers");
	return (
		<>
			<ProviderTabContext.Provider value={{ activeTab, setActiveTab }}>
				<NavTab tabs={providerTabs} useTabContext={useProviderTabContext} />
				{children}
			</ProviderTabContext.Provider>
		</>
	);
};

export default ProviderLayout;
