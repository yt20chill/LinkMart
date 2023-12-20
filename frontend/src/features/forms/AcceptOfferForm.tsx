import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormRadioInput from "../../components/form/FormRadioInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { generateDefaultValues } from "../../lib/formUtils";
import {
	AcceptOfferDto,
	TAcceptOfferForm,
	acceptOfferDtoSchema,
	acceptOfferSchema,
} from "../../schemas/requestSchema";
import { acceptOfferAJAX } from "../../services/api/offerApi";
import { useControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { useGuardedQueryContainer } from "../hooks/useGuardedQueryContainer";
import PostAddressForm from "./PostAddressForm";
import SkeletonForm from "./SkeletonForm";

type AcceptOfferFormProps = {
	offerId: string;
};

const defaultValues = generateDefaultValues(acceptOfferSchema);

const AcceptOfferForm = ({ offerId }: AcceptOfferFormProps) => {
	const [showAddAddress, setShowAddAddress] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		register,
		setValue,
	} = useForm<TAcceptOfferForm>({
		resolver: zodResolver(acceptOfferSchema),
		defaultValues,
		mode: "onSubmit",
	});
	const {
		addresses,
		getAddresses: { isLoading: isGettingAddresses },
	} = useGuardedQueryContainer();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutateAsync: acceptOffer, isLoading } = useMutation({
		mutationFn: (dto: AcceptOfferDto) => acceptOfferAJAX(dto),
		onSuccess: async (result) => {
			if (!result) return;
			await queryClient.invalidateQueries([queryKey.OFFER, { offerId }]);
			navigate(result.url, { replace: true });
		},
	});
	const { setIsShow } = useControlModalContext();

	const onSubmit = async (formData: TAcceptOfferForm) => {
		const dto = acceptOfferDtoSchema.safeParse({
			...formData,
			offerId,
		});
		if (!dto.success) {
			console.error(dto.error);
			return toast.error("Something went wrong! Please try again later");
		}
		setIsShow(false);
		setShowAddAddress(false);
		const option = await withReactContent(SweetAlert).fire({
			title: "Are you sure you want to accept this offer?",
			text: "You will be redirected to the payment page",
			icon: "question",
			showCancelButton: true,
		});
		if (!option.isConfirmed) return setIsShow(false);
		await acceptOffer(dto.data);
	};
	// Get the largest addressId and set to drop down
	const postAddressCallback = () => {
		const newAddressId =
			addresses &&
			addresses.reduce((result, addr) => {
				return addr.addressId > result ? addr.addressId : result;
			}, 0);
		newAddressId && setValue("userAddressId", newAddressId + "");
	};
	return (
		<>
			<form>
				{isGettingAddresses && <SkeletonForm />}
				{addresses && (
					<>
						<FormRadioInput
							name="userAddressId"
							label="Select Shipping Address"
							register={register}
							errors={errors}
							optionItems={addresses.map((address) => ({
								value: address.addressId + "",
								displayValue: address.address,
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
					onSubmitCallback={postAddressCallback}
				/>
			)}
		</>
	);
};

export default AcceptOfferForm;
