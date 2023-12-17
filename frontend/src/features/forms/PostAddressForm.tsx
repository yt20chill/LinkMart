import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormInput, FormSubmitButton } from "../../components/form";
import CancelButton from "../../components/ui/CancelButton";
import { generateDefaultValues } from "../../lib/formUtils";
import { PostAddressDto, postAddressSchema } from "../../schemas/requestSchema";
import { postAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

type PostAddressFormProps = {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
};

const defaultValues = generateDefaultValues(postAddressSchema);

function PostAddressForm({ isShow, setIsShow }: PostAddressFormProps) {
	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = useForm<PostAddressDto>({
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

	const onSubmit = async (data: PostAddressDto) => {
		await postAddress(data);
		reset();
		setIsShow(false);
	};
	return (
		isShow && (
			<form>
				<FormInput name={"address"} register={register} errors={errors} />
				<div className="flex justify-center gap-2">
					<FormSubmitButton
						label="Confirm"
						onClick={handleSubmit(onSubmit)}
						disabled={isPosting}
					/>
					<CancelButton
						onClick={(e) => {
							e.preventDefault();
							setIsShow(false);
							reset();
						}}
						label="Cancel"
					/>
				</div>
			</form>
		)
	);
}

export default PostAddressForm;
