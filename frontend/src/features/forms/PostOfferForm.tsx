import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ErrorMessage, FormInput } from "../../components/form";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { FetchError } from "../../lib/apiUtils";
import {
	OfferForm,
	RequestId,
	postOfferSchema,
} from "../../schemas/requestSchema";
import { postOfferAJAX } from "../../services/api/offerApi";
import { queryKey } from "../../services/query.config";

const defaultValues: OfferForm = {
	price: "",
	offerRemark: "",
};

const PostOfferForm = ({ requestId }: RequestId) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<OfferForm>({
		resolver: zodResolver(postOfferSchema),
		defaultValues,
	});
	const queryClient = useQueryClient();
	const {
		mutateAsync: postOffer,
		error,
		isLoading,
	} = useMutation({
		mutationFn: postOfferAJAX,
		onSuccess: async () => {
			toast.success(`Offer has been made successfully!`);
			await queryClient.invalidateQueries(queryKey.OFFER);
		},
	});
	const onSubmit = async (formData: OfferForm) => {
		const validated = postOfferSchema.parse({ ...formData, requestId });
		await postOffer(validated);
	};
	return (
		<form>
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					name={name as keyof OfferForm}
					register={register}
					errors={errors}
				/>
			))}
			{error instanceof FetchError && <ErrorMessage message={error.message} />}
			<FormSubmitButton
				label="Offer"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default PostOfferForm;
