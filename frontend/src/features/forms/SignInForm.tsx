import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/ui/shadcn/Button";
import { Form, FormInput } from "../../components/ui/shadcn/Form";
import { FetchError, queryKey } from "../../lib/apiUtils";
import { SignInDto } from "../../types/authModels";
import { signInAJAX } from "../api/authApi";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";
import { signInSchema } from "./schema/authSchema";

const SignInForm = () => {
	const form = useForm<SignInDto>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const navigatePrev = useNavigateToPreviousPage();
	const queryClient = useQueryClient();
	const signIn = useMutation({
		mutationFn: (formData: SignInDto) => signInAJAX(formData),
		onSuccess: async (jwt) => {
			window.localStorage.setItem("access_token", jwt);
			await queryClient.invalidateQueries(queryKey.AUTH);
			navigatePrev();
		},
	});

	const onSubmit = (formData: SignInDto) => {
		signIn.mutate(formData);
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
				{signIn.error instanceof FetchError && (
					<p className="text-red-500">{signIn.error.message}</p>
				)}
				<Button type="submit" disabled={signIn.isLoading}>
					Sign In
					{signIn.isLoading && (
						<span className="loading loading-spinner loading-lg"></span>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default SignInForm;
