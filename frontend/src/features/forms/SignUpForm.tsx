import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { FetchError } from "../../lib/apiUtils";
import { TSignUpForm, signUpSchema } from "../../schemas/requestSchema";
import { signUpAJAX } from "../../services/api/authApi";
import { queryKey } from "../../services/query.config";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";

const defaultValues: TSignUpForm = Object.freeze({
	email: "",
	password: "",
	confirmPassword: "",
});

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
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const {
		mutateAsync: signUp,
		error,
		isLoading,
	} = useMutation({
		mutationFn: (signUpDto: Omit<TSignUpForm, "confirmPassword">) =>
			signUpAJAX(signUpDto),
		onSuccess: async ({ jwt }) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});
	const onSubmit = async (formData: TSignUpForm) => {
		const { confirmPassword, ...rest } = formData;
		if (rest.password !== confirmPassword)
			setError("confirmPassword", { message: "Passwords do not match" });
		await signUp(rest);
	};

	return (
		<form className="space-y-8">
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					name={name as keyof TSignUpForm}
					register={register}
					errors={errors}
				/>
			))}
			{error instanceof FetchError && <ErrorMessage message={error.message} />}
			<FormSubmitButton
				label="Sign Up"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
			/>
		</form>
	);
};

export default SignUpForm;
