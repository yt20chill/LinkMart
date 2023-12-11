import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import FormInput from "../../components/form/FormInput";
import { Button } from "../../components/ui/Button";
import { FetchError, queryKey } from "../../lib/apiUtils";
import { signUpAJAX } from "../api/authApi";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";
import { SignUpDto, signUpSchema } from "./requestSchema/authSchema";

const defaultValues: SignUpDto = Object.freeze({
	email: "",
	password: "",
	confirmPassword: "",
});

function SignUpForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
		defaultValues,
		mode: "onTouched",
	});
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const signUp = useMutation({
		mutationFn: (signUpDto: Omit<SignUpDto, "confirmPassword">) =>
			signUpAJAX(signUpDto),
		onSuccess: async ({ jwt }) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});
	const onSubmit = (formData: SignUpDto) => {
		const { confirmPassword, ...rest } = formData;
		if (rest.password !== confirmPassword)
			setError("confirmPassword", { message: "Passwords do not match" });
		signUp.mutate(rest);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{Object.keys(defaultValues).map((name) => (
				<FormInput
					key={name}
					type={/password/i.test(name) ? "password" : "text"}
					name={name as keyof SignUpDto}
					register={register}
					errors={errors}
				/>
			))}
			<Button type="submit" disabled={signUp.isLoading}>
				Sign Up
				{signUp.isLoading && (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</Button>
			{signUp.error instanceof FetchError && (
				<p className="text-red-500">{signUp.error.message}</p>
			)}
		</form>
	);
}

export default SignUpForm;
