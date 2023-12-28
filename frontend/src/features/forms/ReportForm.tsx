import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FormInput,
	FormSubmitButton,
	FormTextAreaInput,
} from "../../components/form";
import { FormLayout } from "../../components/ui/FormLayout";
import { generateDefaultValues } from "../../lib/formUtils";
import { TReportForm, reportFormSchema } from "../../schemas/requestSchema";
import { postReportAJAX } from "../../services/api/orderApi";
import { useControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";

type ReportFormProps = {
	orderId: string;
};

const defaultValues = generateDefaultValues(reportFormSchema);

const ReportForm = ({ orderId }: ReportFormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(reportFormSchema),
		defaultValues,
	});
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutateAsync: report, isLoading } = useMutation({
		mutationFn: (form: TReportForm) => postReportAJAX(orderId, form),
		onSuccess: async () => {
			toast.success(`Your report will be handled ASAP`);
			await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
			setIsShow(false);
			navigate(-1);
		},
	});
	const { setIsShow } = useControlModalContext();
	const onSubmit = async (form: TReportForm) => {
		await report(form);
	};
	return (
		<FormLayout bootstrapIcon="bi-send-exclamation" title="Report Form">
			<form>
				<FormInput name="subject" register={register} errors={errors} />
				<FormTextAreaInput name="content" register={register} errors={errors} />
				<FormSubmitButton
					onClick={handleSubmit(onSubmit)}
					disabled={isLoading}
				/>
			</form>
		</FormLayout>
	);
};

export default ReportForm;
