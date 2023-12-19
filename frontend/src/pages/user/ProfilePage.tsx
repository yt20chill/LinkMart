import { useState } from "react";
import { UserInfoTabs } from "../../types/sharePropsModel";

const ProfilePage = () => {
	const [tab, setTab] = useState<UserInfoTabs>("General");
	return <div>ProfilePage</div>;
};

export default ProfilePage;
