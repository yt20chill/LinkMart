import { useState } from "react";
import Tab from "../../../components/ui/Tab";
import {
	TabContextType,
	UserInfoTabContext,
	useUserInfoTabContext,
} from "../../../services/context/TabsContext";
import { UserInfoTabs, userInfoTabs } from "../../../types/sharePropsModel";
import AddressProfile from "./AddressProfile";
import GeneralProfile from "./GeneralProfile";

const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState<UserInfoTabs>("General");
	return (
		<>
			<UserInfoTabContext.Provider value={{ activeTab, setActiveTab }}>
				{userInfoTabs.map((tab) => (
					<Tab
						key={tab}
						status={tab}
						useTabContext={
							useUserInfoTabContext as () => TabContextType<string>
						}
					/>
				))}
			</UserInfoTabContext.Provider>
			{activeTab === "General" && <GeneralProfile />}
			{activeTab === "Address" && <AddressProfile />}
		</>
	);
};

export default ProfilePage;
