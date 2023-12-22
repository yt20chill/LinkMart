import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Tab from "../../../components/ui/Tab";
import {
	TabContextType,
	UserInfoTabContext,
	useUserInfoTabContext,
} from "../../../services/context/TabsContext";
import { useAuthStore } from "../../../services/stores/authStore";
import { AuthorizeLevels } from "../../../types/authModels";
import { UserInfoTabs, userInfoTabs } from "../../../types/sharePropsModel";
import AddressProfile from "./AddressProfile";
import ApplyProviderProfile from "./ApplyProviderProfile";
import GeneralProfile from "./GeneralProfile";

const ProfilePage = () => {
	const role = useAuthStore(useShallow((state) => state.role));
	const [activeTab, setActiveTab] = useState<UserInfoTabs>("General");
	return (
		<>
			<div className="flex h-30 py-5 items-end">
				<UserInfoTabContext.Provider value={{ activeTab, setActiveTab }}>
					{/* Skip apply as provider tab if already is a provider*/}
					{userInfoTabs
						.filter(
							(tab) => role < AuthorizeLevels.PROVIDER || !/apply/i.test(tab)
						)
						.map((tab) => (
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
				{/general/i.test(activeTab) && <GeneralProfile />}
				{/address/i.test(activeTab) && <AddressProfile />}
				{/apply/i.test(activeTab) && <ApplyProviderProfile />}
			</div>
		</>
	);
};

export default ProfilePage;
