import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { FormInput, FormSubmitButton } from "../../components/form";
import {
  UpdateProfileForm,
  putProfileSchema,
} from "../../schemas/requestSchema";
import { updateProfileAJAX } from "../../services/api/userApi";
import { queryKey } from "../../services/query.config";
import { useAuthStore } from "../../services/stores/authStore";

const PutUserProfileForm = () => {
  const username = useAuthStore(useShallow((state) => state.username));
  if (!username) throw new Error("Username is not defined");
  const defaultValues = Object.freeze({
    username,
    password: "",
    confirmPassword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(putProfileSchema),
    defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutateAsync: updateProfile, isLoading } = useMutation({
    mutationFn: updateProfileAJAX,
    onSuccess: async () => {
      toast.success("Profile updated");
      await queryClient.invalidateQueries(queryKey.AUTH);
    },
  });
  // get the latest username and reset the form on username change
  useEffect(() => {
    reset({ username });
  }, [username, reset]);
  const onSubmit = async (data: UpdateProfileForm) => {
    await updateProfile(data);
  };

  return (
    <>
      <div className="mb-3">
        {Object.keys(defaultValues).map((key) => (
          <FormInput
            key={key}
            register={register}
            errors={errors}
            name={key as keyof UpdateProfileForm}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <FormSubmitButton
          label="Confirm Change"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default PutUserProfileForm;
