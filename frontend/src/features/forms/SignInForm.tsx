import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ErrorMessage from "../../components/form/ErrorMessage";
import FormInput from "../../components/form/FormInput";
import { FetchError, queryKey } from "../../lib/apiUtils";
import {
	SignInDto,
	signInSchema,
} from "../../schemas/requestSchema/authSchema";
import { signInAJAX } from "../api/authApi";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";

const defaultValues = Object.freeze({
	email: "",
	password: "",
});

const SignInForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInDto>({
		resolver: zodResolver(signInSchema),
		defaultValues,
	});
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const signIn = useMutation({
		mutationFn: (formData: SignInDto) => signInAJAX(formData),
		onSuccess: async ({ jwt }) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});

	const onSubmit = (formData: SignInDto) => {
		signIn.mutate(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					type={/password/i.test(name) ? "password" : "text"}
					name={name as keyof SignInDto}
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
