import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../../components/form";
import FormRadioInput from "../../components/form/FormRadioInput";
import {
	UpdatePrimaryAddressForm,
	updatePrimaryAddressFormSchema,
} from "../../schemas/requestSchema";
import { AddressDto } from "../../schemas/responseSchema";
import {
	getAddressAJAX,
	updatePrimaryAddressAJAX,
} from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

const defaultValues = {
	addressId: "",
};

const addresses: AddressDto[] = [
	{ addressId: 1, address: "address 1" },
	{ addressId: 2, address: "address 2" },
	{ addressId: 3, address: "address 3" },
];

const SelectPrimaryAddressForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<UpdatePrimaryAddressForm>({
		defaultValues,
		resolver: zodResolver(updatePrimaryAddressFormSchema),
	});
	const queryClient = useQueryClient();
	const { data /*: addresses*/, isLoading } = useQuery<AddressDto[]>({
		queryKey: [queryKey.USER, "address"],
		// TODO: how to fix axiosWrapper so that it doesn't return undefined?
		queryFn: async () => (await getAddressAJAX()) as AddressDto[],
	});
	const { mutateAsync: updatePrimaryAddress, isLoading: isUpdating } =
		useMutation({
			mutationFn: updatePrimaryAddressAJAX,
			onSuccess: async () => {
				toast.success("Primary address updated");
				await queryClient.invalidateQueries([queryKey.USER, "address"]);
			},
		});
	const onSubmit = async ({ addressId }: UpdatePrimaryAddressForm) => {
		await updatePrimaryAddress(addressId);
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
				onClick={handleSubmit(onSubmit)}
				disabled={isUpdating}
			/>
		</form>
	);
};

export default SelectPrimaryAddressForm;
