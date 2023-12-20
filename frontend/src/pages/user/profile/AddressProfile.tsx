import { useState } from "react";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import PostAddressForm from "../../../features/forms/PostAddressForm";
import SelectPrimaryAddressForm from "../../../features/forms/SelectPrimaryAddressForm";

const AddressProfile = () => {
	const [showPostAddressForm, setShowPostAddressForm] = useState(false);
	return (
		<>
			<SelectPrimaryAddressForm />
			<PrimaryButton
				label="Add New Address"
				onClick={(e) => {
					e.preventDefault();
					setShowPostAddressForm(true);
				}}
			/>
			<PostAddressForm
				isShow={showPostAddressForm}
				setIsShow={setShowPostAddressForm}
			/>
		</>
	);
};

export default AddressProfile;
