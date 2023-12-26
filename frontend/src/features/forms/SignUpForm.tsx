import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { FetchError } from "../../lib/apiUtils";
import { generateDefaultValues } from "../../lib/formUtils";
import { TSignUpForm, signUpSchema } from "../../schemas/requestSchema";
import { signUpAJAX } from "../../services/api/authApi";
import { useAuth } from "../hooks/useAuth";

const defaultValues = generateDefaultValues(signUpSchema);

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onTouched",
  });
  const { signInHandler } = useAuth();
  const {
    mutateAsync: signUp,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (signUpDto: Omit<TSignUpForm, "confirmPassword">) =>
      signUpAJAX(signUpDto),
    onSuccess: async (result) => {
      await signInHandler(result?.jwt);
    },
  });
  const onSubmit = async (formData: TSignUpForm) => {
    const { confirmPassword, ...rest } = formData;
    if (rest.password !== confirmPassword)
      setError("confirmPassword", { message: "Passwords do not match" });
    await signUp(rest);
  };

  return (
    <form className="mx-auto bg-base-100/50 backdrop-blur w-screen sm:w-96 flex flex-col md:shadow-lg rounded-xl py-6 mt-6 md:mt-24 md:border border-base-300 ring-2 ring-base-100">
      <div className="px-9 pb-4 border-b border-base-300 font-bold text-secondary-400 text-lg">
        SIGN IN
      </div>
      <div className="bg-gradient-to-tr from-secondary-400 to-indigo-500 flex items-center justify-center py-16 border-b border-base-300">
        <img
          src="/image/Linkmart-white@512.png"
          className="w-2/3 drop-shadow"
          alt=""
        />
      </div>
      <div className="px-9 pt-6 pb-3 flex flex-col gap-4">
        {Object.keys(defaultValues).map((name) => (
          <FormInput
            key={name}
            name={name as keyof TSignUpForm}
            register={register}
            errors={errors}
          />
        ))}
        {error instanceof FetchError && (
          <ErrorMessage message={error.message} />
        )}
        <FormSubmitButton
          label="Sign Up"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
