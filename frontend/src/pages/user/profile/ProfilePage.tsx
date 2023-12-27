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
      <div className="mt-6 sm:mt-12 max-w-xl w-full flex flex-col mx-auto sm:px-6 mb-6">
        <div className="flex flex-col bg-base-100/50 sm:border border-slate-500/20 rounded-xl overflow-hidden sm:shadow">
          <div className="flex w-full pt-3 text-slate-500 bg-base-100 border-slate-300/50">
            <UserInfoTabContext.Provider value={{ activeTab, setActiveTab }}>
              {/* Skip apply as provider tab if already is a provider*/}
              {userInfoTabs
                .filter(
                  (tab) =>
                    role < AuthorizeLevels.PROVIDER || !/provider/i.test(tab)
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
              <div className="border-b-4 border-slate-300/50 grow">
                {/*Tab gap border*/}
              </div>
            </UserInfoTabContext.Provider>
          </div>
          <div>
            {/general/i.test(activeTab) && <GeneralProfile />}
            {/address/i.test(activeTab) && <AddressProfile />}
            {/provider/i.test(activeTab) && <ApplyProviderProfile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
