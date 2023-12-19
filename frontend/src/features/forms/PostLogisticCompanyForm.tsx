import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormInput, FormSubmitButton } from "../../components/form";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	TPostLogisticCompanyForm,
	postLogisticCompanyFormSchema,
} from "../../schemas/requestSchema";
import { addLogisticCompanyAJAX } from "../../services/api/orderApi";
import { queryKey } from "../../services/query.config";

type PostLogisticCompanyFormProps = {
	onSubmitCallback?: (companyId: number) => void;
};

const defaultValues = generateDefaultValues(postLogisticCompanyFormSchema);

const PostLogisticCompanyForm = ({
	onSubmitCallback,
}: PostLogisticCompanyFormProps) => {
	const queryClient = useQueryClient();
	const { mutateAsync: addLogisticCompany, isLoading } = useMutation({
		mutationFn: (form: TPostLogisticCompanyForm) =>
			addLogisticCompanyAJAX(form),
		onSuccess: async (result) => {
			if (!result) return onSubmitCallback && onSubmitCallback(-1);
			toast.success("Logistic company added successfully!");
			await queryClient.invalidateQueries([queryKey.ORDER, "logistics"]);
			onSubmitCallback && onSubmitCallback(result.logisticCompanyId);
		},
	});
	const onSubmit = async (data: TPostLogisticCompanyForm) => {
		await addLogisticCompany(data);
	};
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<TPostLogisticCompanyForm>({
		resolver: zodResolver(postLogisticCompanyFormSchema),
		defaultValues,
	});
	return (
		<form>
			{Object.keys(defaultValues).map((key) => (
				<FormInput
					key={key}
					name={key as keyof TPostLogisticCompanyForm}
					register={register}
					errors={errors}
				/>
			))}
			<FormSubmitButton
				label="Add"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default PostLogisticCompanyForm;
