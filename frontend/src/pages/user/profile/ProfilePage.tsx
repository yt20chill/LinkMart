import { useState } from "react";
import Tab from "../../../components/ui/Tab";
import {
	UserInfoTabContext,
	useUserInfoTabContext,
} from "../../../services/context/TabsContext";
import { UserInfoTabs, userInfoTabs } from "../../../types/sharePropsModel";

const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState<UserInfoTabs>("General");
	return (
		<>
			<div>ProfilePage</div>
			<UserInfoTabContext.Provider value={{ activeTab, setActiveTab }}>
				{userInfoTabs.map((tab) => (
					<Tab key={tab} status={tab} useTabContext={useUserInfoTabContext} />
				))}
			</UserInfoTabContext.Provider>
		</>
	);
};

export default ProfilePage;
