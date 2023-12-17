import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormSelect } from "../../components/form";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	TAcceptOfferForm,
	acceptOfferFormSchema,
	acceptOfferSchema,
} from "../../schemas/requestSchema";
import { acceptOfferAJAX } from "../../services/api/orderApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useQueryContainer } from "../hooks/useQueryContainer";
import PostAddressForm from "./PostAddressForm";
import SkeletonForm from "./SkeletonForm";

type AcceptOfferFormProps = {
	offerId: string;
};

const defaultValues = generateDefaultValues(acceptOfferFormSchema);

const AcceptOfferForm = ({ offerId }: AcceptOfferFormProps) => {
	const [showAddAddress, setShowAddAddress] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<TAcceptOfferForm>({
		resolver: zodResolver(acceptOfferFormSchema),
		defaultValues,
		mode: "onSubmit",
	});
	const {
		addresses,
		getAddresses: { isLoading: isGettingAddresses },
	} = useQueryContainer();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutateAsync: acceptOffer, isLoading } = useMutation({
		mutationFn: acceptOfferAJAX,
		onSuccess: async (result) => {
			if (!result) return;
			await queryClient.invalidateQueries(queryKey.ORDER);
			navigate(`${siteMap(RouteEnum.Payment)}/${result.orderId}`);
		},
	});
	const onSubmit = async (formData: TAcceptOfferForm) => {
		const acceptOfferDto = acceptOfferSchema.safeParse({
			...formData,
			offerId,
		});
		console.log(formData);
		if (!acceptOfferDto.success) {
			console.error(acceptOfferDto.error);
			return toast.error("Something went wrong! Please try again later");
		}

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
		<>
			<form>
				{isGettingAddresses && <SkeletonForm />}
				{addresses && (
					<>
						<FormSelect
							name="userAddressId"
							register={register}
							errors={errors}
							optionItems={addresses.map((addresses) => ({
								value: addresses.addressId + "",
								displayValue: addresses.address,
							}))}
						/>
						<FormSubmitButton
							label="Accept Offer"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
						/>
					</>
				)}
			</form>
			<PrimaryButton
				label="Add New Address"
				onClick={() => setShowAddAddress(true)}
			/>
			{showAddAddress && (
				<PostAddressForm
					isShow={showAddAddress}
					setIsShow={setShowAddAddress}
				/>
			)}
		</>
	);
};

export default AcceptOfferForm;
