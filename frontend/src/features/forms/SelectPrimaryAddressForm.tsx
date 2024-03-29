import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../../components/form";
import FormRadioInput from "../../components/form/FormRadioInput";
import CancelButton from "../../components/ui/CancelButton";
import {
  fireAlert,
  generateDefaultValues,
  sweetAlertDefaultOptions,
} from "../../lib/formUtils";
import {
  UpdateAddressForm,
  updateAddressFormSchema,
} from "../../schemas/requestSchema";
import {
  deleteAddressAJAX,
  updatePrimaryAddressAJAX,
} from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";
import { useGuardedQueryContainer } from "../hooks/useGuardedQueryContainer";

const defaultValues = generateDefaultValues(updateAddressFormSchema);
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
  const {
    addresses,
    getAddresses: { isLoading: isGettingAddresses },
  } = useGuardedQueryContainer();

  const queryClient = useQueryClient();

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
      {isGettingAddresses && (
        <span className="loading loading-dots loading-lg"></span>
      )}
      {addresses && addresses.length > 0 ? (
        <>
          <FormRadioInput
            name="addressId"
            label="Choose Your Primary Address"
            className="pb-4"
            register={register}
            errors={errors}
            optionItems={addresses.map((address, index) => ({
              value: address.addressId + "",
              displayValue: `${address.address}${
                index === 0 ? " (Primary)" : ""
              }`,
            }))}
          />
          <div className="flex justify-end gap-2">
            <FormSubmitButton
              label="Change Primary Address"
              onClick={handleSubmit(onUpdate)}
              disabled={isUpdating}
            />
            {/* Hide delete button if only one address left */}
            {addresses.length > 1 && (
              <CancelButton
                label="Delete"
                onClick={fireAlert({
                  options: sweetAlertOptions,
                  onConfirmed: handleSubmit(onDelete),
                })}
                disabled={isDeleting}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-slate-400 pb-12">
          <div>No address available yet</div>
        </div>
      )}
    </form>
  );
};

export default SelectPrimaryAddressForm;
