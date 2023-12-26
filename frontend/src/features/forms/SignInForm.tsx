import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { FetchError } from "../../lib/apiUtils";
import { generateDefaultValues } from "../../lib/formUtils";
import { TSignInForm, signInSchema } from "../../schemas/requestSchema";
import { signInAJAX } from "../../services/api/authApi";
import { useAuth } from "../hooks/useAuth";

const defaultValues: TSignInForm = generateDefaultValues(signInSchema);

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });
  const { signInHandler } = useAuth();
  const {
    mutateAsync: signIn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (signInForm: TSignInForm) => signInAJAX(signInForm),
    onSuccess: (result) => {
      signInHandler(result?.jwt);
    },
  });

  const onSubmit = async (signInForm: TSignInForm) => {
    await signIn(signInForm);
  };

  return (
    <form className="mx-auto bg-base-100/50 backdrop-blur w-screen sm:w-96 flex flex-col sm:shadow-lg rounded-xl py-6 mt-6 sm:mt-24 sm:border border-base-300 ring-2 ring-base-100">
      <div className="px-9 pb-4 border-b border-base-300 font-bold text-primary-400 text-lg">
        SIGN IN
      </div>
      <div className="bg-gradient-to-tr from-primary-400 to-secondary-100 flex items-center justify-center py-16 border-b border-base-300">
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
            name={name as keyof TSignInForm}
            register={register}
            errors={errors}
          />
        ))}
        {error instanceof FetchError && (
          <ErrorMessage message={error.message} />
        )}
        <FormSubmitButton
          color="primary"
          label="Sign In"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default SignInForm;
