import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../../components/form";
import FormTextAreaInput from "../../components/form/FormTextAreaInput";
import CancelButton from "../../components/ui/CancelButton";
import { generateDefaultValues } from "../../lib/formUtils";
import { PostAddressDto, postAddressSchema } from "../../schemas/requestSchema";
import { postAddressAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";

type PostAddressFormProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  onSubmitCallback?: (addressId: number) => void;
};

const defaultValues = generateDefaultValues(postAddressSchema);

function PostAddressForm({
  isShow,
  setIsShow,
  onSubmitCallback,
}: PostAddressFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PostAddressDto>({
    resolver: zodResolver(postAddressSchema),
    defaultValues,
    mode: "onTouched",
  });
  const queryClient = useQueryClient();
  // Backend can response with the latest address Id after post
  const { mutateAsync: postAddress, isLoading: isPosting } = useMutation({
    mutationFn: postAddressAJAX,
    onSuccess: async (result) => {
      await queryClient.invalidateQueries([queryKey.USER, "address"]);
      if (!result) return toast.error("Something went wrong");
      toast.success("Address added successfully!");
      reset();
      setIsShow(false);
      onSubmitCallback && onSubmitCallback(result.addressId);
    },
  });

  const onSubmit = async (data: PostAddressDto) => {
    await postAddress(data);
  };
  return (
    isShow && (
      <form>
        {Object.keys(defaultValues).map((name) => (
          <FormTextAreaInput
            key={name}
            name={name as keyof PostAddressDto}
            register={register}
            errors={errors}
          />
        ))}
        <div className="flex justify-end gap-2 mt-2">
          <FormSubmitButton
            label="Confirm"
            onClick={handleSubmit(onSubmit)}
            disabled={isPosting}
          />
          <CancelButton
            onClick={(e) => {
              e.preventDefault();
              setIsShow(false);
              reset();
            }}
            label="Cancel"
          />
        </div>
      </form>
    )
  );
}

export default PostAddressForm;
