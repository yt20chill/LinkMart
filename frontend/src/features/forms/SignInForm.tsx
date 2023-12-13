import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
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
	const signIn = useMutation({
		mutationFn: (signInForm: TSignInForm) => signInAJAX(signInForm),
		onSuccess: async ({ jwt }) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});

	const onSubmit = (signInForm: TSignInForm) => {
		signIn.mutate(signInForm);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					type={/password/i.test(name) ? "password" : "text"}
					name={name as keyof TSignInForm}
					register={register}
					errors={errors}
				/>
			))}
			{signIn.error instanceof FetchError && (
				<ErrorMessage message={signIn.error.message} />
			)}
			<button
				type="submit"
				onClick={handleSubmit(onSubmit)}
				className="btn btn-warning"
			>
				SignIn
			</button>
		</form>
	);
};

export default SignInForm;
