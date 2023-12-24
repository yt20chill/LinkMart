import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton, FormTextAreaInput } from "../../components/form";
import { generateDefaultValues } from "../../lib/formUtils";
import {
  EditProviderProfileForm,
  editProviderProfileSchema,
} from "../../schemas/requestSchema";
import { editProviderProfileAJAX } from "../../services/api/providerApi";
import { queryKey } from "../../services/query.config";

type ProviderProfileFormProps = {
  defaultValues?: EditProviderProfileForm;
};

const ProviderProfileForm = ({
  defaultValues = generateDefaultValues(editProviderProfileSchema),
}: ProviderProfileFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProviderProfileForm>({
    resolver: zodResolver(editProviderProfileSchema),
    defaultValues,
    mode: "onBlur",
  });
  const queryClient = useQueryClient();
  const { mutateAsync: edit, isLoading } = useMutation({
    mutationFn: editProviderProfileAJAX,
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await queryClient.invalidateQueries([queryKey.PROVIDER, "profile"]);
    },
  });
  const onSubmit = async (form: EditProviderProfileForm) => {
    await edit(form);
  };
  return (
    <>
      <h2 className="text-xl inline-flex gap-2 text-primary-400 font-bold p-6 pb-3 border-b border-primary-400 shadow-3xl">
        <i className="bi bi-chat-square-text"></i>
        Edit Biography
      </h2>
      <form className="p-8 pt-4 flex flex-col gap-6">
        <FormTextAreaInput
          name="biography"
          register={register}
          errors={errors}
        />
        <FormSubmitButton
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </form>
    </>
  );
};

export default ProviderProfileForm;
