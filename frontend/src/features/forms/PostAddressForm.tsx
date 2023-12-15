import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormInput, FormSubmitButton } from "../../components/form";
import CancelButton from "../../components/ui/CancelButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { PostAddressDto, postAddressSchema } from "../../schemas/requestSchema";
import { postAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

function PostAddressForm() {
	const [isShow, setIsShow] = useState(true);
	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = useForm<PostAddressDto>({
		resolver: zodResolver(postAddressSchema),
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
	};
	return isShow ? (
		<form>
			<FormInput name={"address"} register={register} errors={errors} />
			<div className="flex align-middle justify-center space-x-2">
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
	) : (
		<PrimaryButton
			label="Add address"
			onClick={(e) => {
				e.preventDefault();
				setIsShow(true);
			}}
		/>
	);
}

export default PostAddressForm;
