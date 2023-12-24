import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import FormModal from "../../components/modal/FormModal";
import Loading from "../../components/ui/Loading";
import ProviderProfileForm from "../../features/forms/ProviderProfileForm";
import ProviderProfileDisplay from "../../features/providerProfile/providerProfileDisplay";
import { getProviderProfileAJAX } from "../../services/api/providerApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";

const ProviderProfilePage = () => {
  const { providerId } = useParams();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { data: profile, isLoading: isGettingProfile } = useQuery({
    queryKey: [queryKey.PROVIDER, { providerId }],
    queryFn: () => getProviderProfileAJAX(providerId),
  });
  if (isGettingProfile) return <Loading />;
  return (
    <div className="mt-12 bg-base-100 rounded-lg">
      <ControlModalContext.Provider
        value={{ isShow: showEditProfile, setIsShow: setShowEditProfile }}
      >
        {profile && <ProviderProfileDisplay dto={profile} />}
        <FormModal>
          <ProviderProfileForm
            defaultValues={{ biography: profile?.biography }}
          />
        </FormModal>
      </ControlModalContext.Provider>
    </div>
  );
};

export default ProviderProfilePage;
