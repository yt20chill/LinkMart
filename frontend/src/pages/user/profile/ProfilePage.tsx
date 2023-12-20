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
			<div className="flex w-96 ms-10">
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
			</div>
			<div className="ms-10">
				{activeTab === "General" && <GeneralProfile />}
				{activeTab === "Address" && <AddressProfile />}
			</div>
		</>
	);
};

export default ProfilePage;
