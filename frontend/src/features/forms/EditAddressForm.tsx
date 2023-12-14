import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormInput, FormSubmitButton } from "../../components/form";
import { generateEmptyStringDefaultValues } from "../../lib/formUtils";
import { AddAddressForm, postAddressSchema } from "../../schemas/requestSchema";
import { postAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const defaultValues = generateEmptyStringDefaultValues(postAddressSchema);

function EditAddressForm() {
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<AddAddressForm>({
		resolver: zodResolver(postAddressSchema),
		defaultValues,
		mode: "onTouched",
	});
	const queryClient = useQueryClient();
	const { mutateAsync: postAddress, isLoading: isPosting } = useMutation({
		mutationFn: postAddressAJAX,
		onSuccess: async () => {
			toast.success("Address added successfully!");
			await queryClient.invalidateQueries([queryKey.USER, "address"]);
		},
	});
	const onSubmit = async (data: AddAddressForm) => {
		await postAddress(data);
	};
	return (
		<form>
			<FormInput name="address" register={register} errors={errors} />
			<FormSubmitButton
				label="Confirm Change"
				onClick={handleSubmit(onSubmit)}
				disabled={isPosting}
			/>
		</form>
	);
}

export default EditAddressForm;
