import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { SweetAlertOptions } from "sweetalert2";
import FormModal from "../../../components/modal/FormModal";
import CancelButton from "../../../components/ui/CancelButton";
import { FormLayout } from "../../../components/ui/FormLayout";
import Table from "../../../components/ui/Table";
import ApplyProviderForm from "../../../features/forms/ApplyProviderForm";
import SkeletonForm from "../../../features/forms/SkeletonForm";
import { fireAlert } from "../../../lib/formUtils";
import { ApplicationStatus } from "../../../schemas/responseSchema";
import {
	abortApplicationAJAX,
	getProviderApplicationStatusAJAX,
} from "../../../services/api/providerApi";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { queryKey } from "../../../services/query.config";

const ApplyProviderProfile = () => {
	const { data: status, isLoading } = useQuery({
		queryKey: [queryKey.AUTH, "providerApplication"],
		queryFn: getProviderApplicationStatusAJAX,
	});
	const [showToS, setShowToS] = useState(false);
	if (isLoading) return <SkeletonForm />;
	if (status?.data === null)
		return (
			<>
				<FormLayout title="Become Provider" bootstrapIcon="bi-check2-circle">
					<ApplyProviderForm />
				</FormLayout>
				<div className="text-center">
					<span
						className=" text-primary-400 hover:text-primary-500 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							setShowToS(true);
						}}
					>
						Terms of Service
					</span>{" "}
					Applies
				</div>
				<ControlModalContext.Provider
					value={{ isShow: showToS, setIsShow: setShowToS }}
				>
					<FormModal>
						<div className="px-12 py-6">
							<h2 className="">Terms of Service</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
								voluptatibus, voluptatum, dolorum, quia quod quos voluptate
								voluptatem quibusdam voluptates quae doloribus
							</p>
						</div>
					</FormModal>
				</ControlModalContext.Provider>
			</>
		);
	return status && status.data && <PendingApproval {...status.data} />;
};

export default ApplyProviderProfile;

const sweetAlertOptions: SweetAlertOptions = {
	icon: "warning",
	title: "Abort Application",
	text: "Are you sure you want to abort your application?",
	confirmButtonText: "Yes, abort it!",
	showCancelButton: true,
	cancelButtonText: "No, keep it!",
};
const PendingApproval = (data: ApplicationStatus) => {
	const queryClient = useQueryClient();
	const { mutateAsync: abortApplication, isLoading } = useMutation({
		mutationFn: abortApplicationAJAX,
		onSuccess: async () => {
			toast.success("Application aborted");
			await queryClient.invalidateQueries();
		},
	});
	const onConfirmed = async () => {
		await abortApplication();
	};
	return (
		<>
			<Table data={[data]} />
			<CancelButton
				label="Abort"
				onClick={fireAlert({
					options: sweetAlertOptions,
					onConfirmed: onConfirmed,
				})}
				disabled={isLoading}
			/>
		</>
	);
};
