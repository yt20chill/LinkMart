import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
	FormInput,
	FormRatingInput,
	FormSubmitButton,
} from "../../components/form";
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
		<form>
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
			<FormInput name="comments" register={register} errors={errors} />
			<FormSubmitButton
				onClick={handleSubmit(onSubmit)}
				label="Submit"
				disabled={isLoading}
			/>
		</form>
	);
};

export default ReviewForm;
