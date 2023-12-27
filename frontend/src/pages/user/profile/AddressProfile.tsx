import { useState } from "react";
import { FormLayout } from "../../../components/ui/FormLayout";
import PostAddressForm from "../../../features/forms/PostAddressForm";
import SelectPrimaryAddressForm from "../../../features/forms/SelectPrimaryAddressForm";

const AddressProfile = () => {
	const [showPostAddressForm, setShowPostAddressForm] = useState(false);
	return (
		<>
			<FormLayout title="Primary Address" bootstrapIcon="bi-airplane">
				<SelectPrimaryAddressForm />
				<div className="px-6 pt-3 flex">
					<div
						className="ms-auto inline-flex rounded-badge text-sm text-gray-400 hover:text-secondary-400"
						onClick={() => setShowPostAddressForm(true)}
					>
						<i className="bi bi-plus-square-dotted me-2"></i>New address
					</div>
				</div>
				{showPostAddressForm && (
					<div className="border-t border-slate-500/20 mt-6">
						<PostAddressForm
							isShow={showPostAddressForm}
							setIsShow={setShowPostAddressForm}
						/>
					</div>
				)}
			</FormLayout>
		</>
	);
};

export default AddressProfile;
