import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { FetchError } from "../../lib/apiUtils";
import { TSignInForm, signInSchema } from "../../schemas/requestSchema";
import { signInAJAX } from "../../services/api/authApi";
import { queryKey } from "../../services/query.config";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";

const defaultValues: TSignInForm = Object.freeze({
	email: "",
	password: "",
});

const SignInForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TSignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues,
	});
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const {
		mutateAsync: signIn,
		isLoading,
		error,
	} = useMutation({
		mutationFn: (signInForm: TSignInForm) => signInAJAX(signInForm),
		onSuccess: async ({ jwt }) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
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
				label="Offer"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default SignInForm;
