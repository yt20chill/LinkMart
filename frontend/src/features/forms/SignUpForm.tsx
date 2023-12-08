import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/ui/shadcn/Button";
import { Form, FormInput } from "../../components/ui/shadcn/Form";
import { FetchError, queryKey } from "../../lib/apiUtils";
import { SignUpDto, signUpSchema } from "../../types/authModels";
import { signUpAJAX } from "../api/authApi";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";

function SignUpForm() {
	const form = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onTouched",
	});
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const signUp = useMutation({
		mutationFn: (signUpDto: Omit<SignUpDto, "confirmPassword">) =>
			signUpAJAX(signUpDto),
		onSuccess: async (jwt) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});
	const onSubmit = (formData: SignUpDto) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...rest } = formData;
		signUp.mutate(rest);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={() => form.handleSubmit(onSubmit)} className="space-y-8">
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
				{signUp.error instanceof FetchError && (
					<p className="text-red-500">{signUp.error.message}</p>
				)}
				<Button type="submit" disabled={signUp.isLoading}>
					Sign Up
					{signUp.isLoading && (
						<span className="loading loading-spinner loading-lg"></span>
					)}
				</Button>
			</form>
		</Form>
	);
}

export default SignUpForm;
