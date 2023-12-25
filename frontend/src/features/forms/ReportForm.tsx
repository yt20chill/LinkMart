import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
	FormInput,
	FormSubmitButton,
	FormTextAreaInput,
} from "../../components/form";
import { generateDefaultValues } from "../../lib/formUtils";
import { TReportForm, reportFormSchema } from "../../schemas/requestSchema";
import { postReportAJAX } from "../../services/api/orderApi";
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
	const { mutateAsync: report, isLoading } = useMutation({
		mutationFn: (form: TReportForm) => postReportAJAX(orderId, form),
		onSuccess: async () => {
			toast.success(`Your report will be handled ASAP`);
			await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
		},
	});
	const onSubmit = async (form: TReportForm) => {
		await report(form);
	};
	return (
		<>
			<h2>Report Form</h2>
			<form>
				<FormInput name="subject" register={register} errors={errors} />
				<FormTextAreaInput name="content" register={register} errors={errors} />
				<FormSubmitButton
					onClick={handleSubmit(onSubmit)}
					disabled={isLoading}
				/>
			</form>
		</>
	);
};

export default ReportForm;
