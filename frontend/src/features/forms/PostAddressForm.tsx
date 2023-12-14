import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormInput, FormSubmitButton } from "../../components/form";
import {
	TPostAddressForm,
	postAddressFormSchema,
} from "../../schemas/requestSchema";
import { postAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

function PostAddressForm() {
	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
	} = useForm<TPostAddressForm>({
		resolver: zodResolver(postAddressFormSchema),
		mode: "onTouched",
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "address",
		shouldUnregister: true,
	});
	const queryClient = useQueryClient();
	const { mutateAsync: postAddress, isLoading: isPosting } = useMutation({
		mutationFn: postAddressAJAX,
		onSuccess: async () => {
			toast.success("Address added successfully!");
			await queryClient.invalidateQueries([queryKey.USER, "address"]);
		},
	});

	const onSubmit = async (data: TPostAddressForm) => {
		const postAddressDto = { address: [] as string[] };
		data.address.reduce((acc, addr) => {
			if (addr.address) acc.address.push(addr.address);
			return acc;
		}, postAddressDto);
		await postAddress(postAddressDto);
	};
	return (
		<form>
			{fields.map((field, index) => (
				<>
					<FormInput
						key={field.id}
						name={`address[${index}].address` as const}
						label={`Address ${index + 1}`}
						register={register}
						errors={errors}
					/>
					<button
						className="btn btn-error"
						key={`remove-${field.id}`}
						onClick={(e) => {
							e.preventDefault();
							remove(index);
						}}
					>
						Remove
					</button>
				</>
			))}

			{/* <FormInput name="address" register={register} errors={errors} /> */}
			<FormSubmitButton
				label="Confirm Change"
				onClick={handleSubmit(onSubmit)}
				disabled={isPosting}
			/>
			<button
				className="btn btn-success"
				onClick={(e) => {
					e.preventDefault();
					append({ address: "" });
				}}
			>
				Add New Address
			</button>
		</form>
	);
}

export default PostAddressForm;
