import { FormLayout } from "../../../components/ui/FormLayout";
import PutUserProfileForm from "../../../features/forms/PutUserProfileForm";

const GeneralProfile = () => {
	return (
		<FormLayout title="Edit Profile" bootstrapIcon="bi-person">
			<PutUserProfileForm />
		</FormLayout>
	);
};

export default GeneralProfile;
