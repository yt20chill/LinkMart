// TODO: Change the form totally

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormInput } from "../../components/form";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	TAcceptOfferForm,
	acceptOfferFormSchema,
	acceptOfferSchema,
} from "../../schemas/requestSchema";
import { acceptOfferAJAX } from "../../services/api/orderApi";
import { queryKey } from "../../services/query.config";
import routesConfig, { RouteEnum } from "../../services/routes.config";

type AcceptOfferFormProps = {
	offerId: string;
};

const defaultValues = generateDefaultValues(acceptOfferFormSchema);

const AcceptOfferForm = ({ offerId }: AcceptOfferFormProps) => {
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<TAcceptOfferForm>({
		resolver: zodResolver(acceptOfferFormSchema),
		defaultValues,
		mode: "onTouched",
	});
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutateAsync: acceptOffer, isLoading } = useMutation({
		mutationFn: acceptOfferAJAX,
		onSuccess: async (result) => {
			if (!result) return;
			await queryClient.invalidateQueries(queryKey.ORDER);
			// TODO: Handle payment here?
			navigate(
				`${routesConfig.get(RouteEnum.OrderDetail)?.path}/${result.orderId}`
			);
		},
	});
	const onSubmit = async (formData: TAcceptOfferForm) => {
		const acceptOfferDto = acceptOfferSchema.safeParse({
			...formData,
			offerId,
		});
		if (!acceptOfferDto.success)
			return toast.error("Something went wrong! Please try again later");
		const option = await withReactContent(SweetAlert).fire({
			title: "Are you sure you want to accept this offer?",
			text: "You will be redirected to the payment page",
			icon: "question",
			showCancelButton: true,
		});
		if (!option.isConfirmed) return;
		await acceptOffer(acceptOfferDto.data);
	};
	return (
		<form>
			<FormInput name="shippingAddress" register={register} errors={errors} />
			<FormSubmitButton
				label="Accept Offer"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default AcceptOfferForm;
