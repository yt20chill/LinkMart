import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../../components/form";
import FormRadioInput from "../../components/form/FormRadioInput";
import CancelButton from "../../components/ui/CancelButton";
import { fireAlert, sweetAlertDefaultOptions } from "../../lib/formUtils";
import {
	UpdateAddressForm,
	updateAddressFormSchema,
} from "../../schemas/requestSchema";
import { AddressDto } from "../../schemas/responseSchema";
import {
	deleteAddressAJAX,
	getAddressAJAX,
	updatePrimaryAddressAJAX,
} from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const defaultValues = {
	addressId: "",
};
const sweetAlertOptions = {
	...sweetAlertDefaultOptions,
	text: "Are you sure you want to delete this address?",
};

const SelectPrimaryAddressForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<UpdateAddressForm>({
		defaultValues,
		resolver: zodResolver(updateAddressFormSchema),
	});

	const queryClient = useQueryClient();
	const { data: addresses, isLoading } = useQuery<AddressDto[]>({
		queryKey: [queryKey.USER, "address"],
		queryFn: getAddressAJAX,
	});
	const { mutateAsync: updatePrimaryAddress, isLoading: isUpdating } =
		useMutation({
			mutationFn: updatePrimaryAddressAJAX,
			onSuccess: async () => {
				toast.success("Primary address updated");
				await queryClient.invalidateQueries([queryKey.USER, "address"]);
			},
		});
	const { mutateAsync: deleteAddress, isLoading: isDeleting } = useMutation({
		mutationFn: deleteAddressAJAX,
		onSuccess: async () => {
			toast.success("Address deleted");
			await queryClient.invalidateQueries([queryKey.USER, "address"]);
		},
	});
	const onUpdate = async ({ addressId }: UpdateAddressForm) => {
		await updatePrimaryAddress(addressId);
	};
	const onDelete = async ({ addressId }: UpdateAddressForm) => {
		await deleteAddress(addressId);
	};

	return (
		<form>
			{isLoading && <span className="loading loading-dots loading-lg"></span>}
			{addresses && (
				<FormRadioInput
					name="addressId"
					label="Choose Your Primary Address"
					register={register}
					errors={errors}
					optionItems={addresses.map((address) => ({
						value: address.addressId + "",
						displayValue: address.address,
					}))}
				/>
			)}
			<FormSubmitButton
				label="Change Primary Address"
				onClick={handleSubmit(onUpdate)}
				disabled={isUpdating}
			/>
			<CancelButton
				label="Delete"
				onClick={fireAlert({
					options: sweetAlertOptions,
					onConfirmed: handleSubmit(onDelete),
				})}
				disabled={isDeleting}
			/>
		</form>
	);
};

export default SelectPrimaryAddressForm;
