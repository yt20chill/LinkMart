import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import FormModal from "../../components/modal/FormModal";
import Loading from "../../components/ui/Loading";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ProviderProfileForm from "../../features/forms/ProviderProfileForm";
import ProviderProfileDisplay from "../../features/providerProfile/providerProfileDisplay";
import { getProviderProfileAJAX } from "../../services/api/providerApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { useAuthStore } from "../../services/stores/authStore";
import { AuthorizeLevels } from "../../types/authModels";

const ProviderProfilePage = () => {
	const { username, role } = useAuthStore(
		useShallow((state) => ({ username: state.username, role: state.role }))
	);
	const { providerId } = useParams();
	const [showEditProfile, setShowEditProfile] = useState(false);
	const { data: profile, isLoading: isGettingProfile } = useQuery({
		queryKey: [queryKey.PROVIDER, { providerId }],
		queryFn: () => getProviderProfileAJAX(providerId),
	});
	if (isGettingProfile) return <Loading />;
	return (
		<>
			{profile && <ProviderProfileDisplay dto={profile} />}
			{role === AuthorizeLevels.PROVIDER && username === profile?.username && (
				<PrimaryButton
					label="🖋️"
					onClick={(e) => {
						e.preventDefault();
						setShowEditProfile(true);
					}}
				/>
			)}
			<ControlModalContext.Provider
				value={{ isShow: showEditProfile, setIsShow: setShowEditProfile }}
			>
				<FormModal>
					<ProviderProfileForm
						defaultValues={{ biography: profile?.biography }}
					/>
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
};

export default ProviderProfilePage;
