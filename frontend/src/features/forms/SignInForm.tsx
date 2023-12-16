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
		onSuccess: async (result) => {
			await signInHandler(result?.jwt);
		},
	});

	const onSubmit = async (signInForm: TSignInForm) => {
		await signIn(signInForm);
	};

	return (
		<form className="space-y-8">
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					name={name as keyof TSignInForm}
					register={register}
					errors={errors}
				/>
			))}
			{error instanceof FetchError && <ErrorMessage message={error.message} />}
			<FormSubmitButton
				label="Sign In"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default SignInForm;
