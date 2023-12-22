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
  const postAddressCallback = (addressId: number) => {
    setValue("userAddressId", addressId + "");
  };
  return (
    <>
      <h2 className="text-xl inline-flex gap-2 text-secondary-400 font-bold p-6 pb-3 border-b border-secondary-400 shadow-3xl">
        <i className="bi bi-person-check"></i>
        Accept Offer
      </h2>
      <div className="px-6 pt-3 flex">
        <div
          className="ms-auto inline-flex rounded-badge text-sm text-gray-400 hover:text-secondary-400"
          onClick={() => setShowAddAddress(true)}
        >
          <i className="bi bi-plus-square-dotted me-2"></i>New address
        </div>
      </div>
      <form className="p-6 pt-0">
        {isGettingAddresses && <SkeletonForm />}
        {addresses ? (
          <>
            <FormRadioInput
              className="h-56"
              name="userAddressId"
              label="Order address"
              register={register}
              errors={errors}
              optionItems={addresses.map((address) => ({
                value: address.addressId + "",
                displayValue: address.address,
              }))}
            />
            <div className="w-full relative h-0">
              <div className="w-full absolute bottom-0 bg-gradient-to-t from-base-100 to-base-100/0 h-12">
                {/*blur bottom*/}
              </div>
            </div>
            <FormSubmitButton
              className="flex ms-auto mt-2"
              label="Accept Offer"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
          </>
        ) : (
          <>
            <div>No address record</div>
          </>
        )}
      </form>
      <div className="p-3">
        {showAddAddress && (
          <div className="p-3 border rounded-xl bg-slate-100">
            <PostAddressForm
              isShow={showAddAddress}
              setIsShow={setShowAddAddress}
              onSubmitCallback={postAddressCallback}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptOfferForm;
