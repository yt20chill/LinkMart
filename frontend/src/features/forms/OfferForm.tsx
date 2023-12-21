import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage, FormInput } from "../../components/form";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FormTextAreaInput from "../../components/form/FormTextAreaInput";
import { FetchError } from "../../lib/apiUtils";
import { dtoToString, generateDefaultValues } from "../../lib/formUtils";
import { TOfferForm, offerSchema } from "../../schemas/requestSchema";
import { postOfferAJAX, putOfferAJAX } from "../../services/api/offerApi";
import { queryKey } from "../../services/query.config";

const defaultEmptyValues = generateDefaultValues(offerSchema);

type TPostOfferFormProps = {
  requestId: string;
};
type TPutOfferFormProps = {
  offerId: string;
  defaultValues: TOfferForm;
};

type OfferFormProps = TPostOfferFormProps | TPutOfferFormProps;

const OfferForm = (props: OfferFormProps) => {
  const isEdit = "offerId" in props;
  const id = isEdit ? props.offerId : props.requestId;
  const defaultValues = isEdit
    ? dtoToString(props.defaultValues)
    : defaultEmptyValues;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TOfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutateAsync: mutateOffer,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (data: TOfferForm) =>
      "requestId" in props ? postOfferAJAX(id, data) : putOfferAJAX(id, data),
    onSuccess: async () => {
      toast.success(`Offer has been made successfully!`);
      await queryClient.invalidateQueries(queryKey.OFFER);
      navigate(-1);
    },
  });
  const onSubmit = async (form: TOfferForm) => {
    await mutateOffer(form);
  };
  return (
    <>
      <h2 className="text-xl inline-flex gap-2 text-primary-400 font-bold p-6 pb-3 border-b border-primary-400 shadow-3xl">
        <i className="bi bi-sticky"></i>
        Make Offer
      </h2>
      <form className="p-6">
        {Object.keys(defaultValues).map((name) => {
          return /remark/gi.test(name) ? (
            <FormTextAreaInput
              key={name}
              name={name as keyof TOfferForm}
              register={register}
              errors={errors}
            />
          ) : (
            <FormInput
              key={name}
              name={name as keyof TOfferForm}
              register={register}
              errors={errors}
            />
          );
        })}
        {error instanceof FetchError && (
          <ErrorMessage message={error.message} />
        )}
        <FormSubmitButton
          className="flex items-center justify-center mt-4 ms-auto"
          label="Confirm"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </form>
    </>
  );
};

export default OfferForm;
