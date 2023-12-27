import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { SweetAlertOptions } from "sweetalert2";
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
import { queryKey } from "../../../services/query.config";

const ApplyProviderProfile = () => {
	const { data: status, isLoading } = useQuery({
		queryKey: [queryKey.AUTH, "providerApplication"],
		queryFn: getProviderApplicationStatusAJAX,
	});
	if (isLoading) return <SkeletonForm />;
	if (status?.data === null)
		return (
			<FormLayout title="Apply as a Provider" bootstrapIcon="bi-check2-circle">
				<ApplyProviderForm />
			</FormLayout>
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
