import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/shadcn/Button";
import { Form, FormInput } from "../../components/ui/shadcn/Form";
import { FetchError } from "../../lib/apiUtils";
import { routeConfigMap } from "../../pages/routes.config";
import { SignUpDto, signUpSchema } from "../../types/authModels";
import { signUpAJAX } from "../api/authApi";

function SignUpForm() {
	const form = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onBlur",
	});

	const {
		mutate: signUp,
		isLoading: isLoadingSignUp,
		error: signUpError,
		isSuccess: isSuccessSignUp,
	} = useMutation({
		mutationFn: (signUpDto: Omit<SignUpDto, "confirmPassword">) =>
			signUpAJAX(signUpDto),
		onSuccess: (jwt) => {
			window.localStorage.setItem("access_token", jwt);
		},
	});
	const navigate = useNavigate();
	const onSubmit = (formData: SignUpDto) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...rest } = formData;
		signUp(rest);
		form.reset();
		if (isSuccessSignUp) {
			navigate(routeConfigMap.get("requests")!.path, { replace: true });
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormInput formControl={form.control} fieldName="email" />
				<FormInput
					formControl={form.control}
					fieldName="password"
					inputType="password"
				/>
				<FormInput
					formControl={form.control}
					fieldName="confirmPassword"
					inputType="password"
				/>
				<Button type="submit" disabled={isLoadingSignUp}>
					Sign Up
				</Button>
			</form>
			{isLoadingSignUp && (
				<span className="loading loading-spinner loading-lg"></span>
			)}
			{signUpError instanceof FetchError && (
				<p className="text-red-500">{signUpError.message}</p>
			)}
		</Form>
	);
}

export default SignUpForm;
