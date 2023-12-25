import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { FormRatingInput, FormSubmitButton } from "../../components/form";
import FormTextAreaInput from "../../components/form/FormTextAreaInput";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	TReviewOrderForm,
	reviewOrderFormSchema,
} from "../../schemas/requestSchema";
import { reviewOrderAJAX } from "../../services/api/orderApi";
import { queryKey } from "../../services/query.config";

type ReviewFormProps = {
	orderId: string;
};

const defaultValues: TReviewOrderForm = generateDefaultValues(
	reviewOrderFormSchema
);

const ReviewForm = ({ orderId }: ReviewFormProps) => {
	const queryClient = useQueryClient();
	const { mutateAsync: postReview, isLoading } = useMutation({
		mutationFn: (form: TReviewOrderForm) => reviewOrderAJAX(orderId, form),
		onSuccess: async () => {
			await queryClient.invalidateQueries([queryKey.ORDER, { orderId }]);
		},
	});
	const onSubmit = async (form: TReviewOrderForm) => {
		await postReview(form);
	};
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<TReviewOrderForm>({
		resolver: zodResolver(reviewOrderFormSchema),
		defaultValues,
	});
	return (
		<form className="flex flex-col w-96 md:border md:rounded-lg md:shadow-md overflow-hidden">
			<div className="md:text-white py-3 md:px-6 flex items-center gap-1 md:bg-primary-400">
				<span className="material-symbols-rounded text-md">reviews</span>
				Rate Your Provider
			</div>
			<div className="p-0 md:p-6 flex flex-col gap-2">
				<FormRatingInput
					name="efficiency"
					register={register}
					errors={errors}
					maxScore={5}
				/>
				<FormRatingInput
					name="attitude"
					register={register}
					errors={errors}
					maxScore={5}
				/>
				<FormTextAreaInput
					name="comments"
					register={register}
					errors={errors}
				/>
				<FormSubmitButton
					onClick={handleSubmit(onSubmit)}
					label="Submit"
					disabled={isLoading}
				/>
			</div>
		</form>
	);
};

export default ReviewForm;
