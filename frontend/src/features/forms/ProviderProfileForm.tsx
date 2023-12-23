import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton, FormTextAreaInput } from "../../components/form";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	EditProviderProfileForm,
	editProviderProfileSchema,
} from "../../schemas/requestSchema";
import { editProviderProfileAJAX } from "../../services/api/providerApi";
import { queryKey } from "../../services/query.config";

type ProviderProfileFormProps = {
	defaultValues?: EditProviderProfileForm;
};

const ProviderProfileForm = ({
	defaultValues = generateDefaultValues(editProviderProfileSchema),
}: ProviderProfileFormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<EditProviderProfileForm>({
		resolver: zodResolver(editProviderProfileSchema),
		defaultValues,
		mode: "onBlur",
	});
	const queryClient = useQueryClient();
	const { mutateAsync: edit, isLoading } = useMutation({
		mutationFn: editProviderProfileAJAX,
		onSuccess: async () => {
			toast.success("Profile updated successfully");
			await queryClient.invalidateQueries([queryKey.PROVIDER, "profile"]);
		},
	});
	const onSubmit = async (form: EditProviderProfileForm) => {
		await edit(form);
	};
	return (
		<form>
			<FormTextAreaInput name="biography" register={register} errors={errors} />
			<FormSubmitButton onClick={handleSubmit(onSubmit)} disabled={isLoading} />
		</form>
	);
};

export default ProviderProfileForm;
