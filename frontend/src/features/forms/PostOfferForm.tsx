import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ErrorMessage, FormInput } from "../../components/form";
import { FetchError } from "../../lib/apiUtils";
import {
	OfferForm,
	postOfferSchema,
} from "../../schemas/requestSchema/offerSchema";
import { postOfferAJAX } from "../../services/api/offerApi";
import { queryKey } from "../../services/query.config";

const defaultValues: OfferForm = {
	requestId: "",
	price: "",
	offerRemark: "",
};

const PostOfferForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<OfferForm>({
		resolver: zodResolver(postOfferSchema),
		defaultValues,
	});
	const queryClient = useQueryClient();
	const { mutateAsync: postOffer, error } = useMutation({
		mutationFn: postOfferAJAX,
		onSuccess: async () => {
			toast.success(`Offer has been made successfully!`);
			await queryClient.invalidateQueries(queryKey.OFFER);
		},
	});
	const onSubmit = async (formData: OfferForm) => {
		await postOffer(formData);
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
			<button onClick={handleSubmit(onSubmit)} className="btn btn-warning">
				Offer
			</button>
		</form>
	);
};

export default PostOfferForm;
