import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/shadcn/Button";
import { Form, FormInput } from "../../components/ui/shadcn/Form";
import { SignInDto, signInSchema } from "../../types/authModels";

function SignInForm() {
	const form = useForm<SignInDto>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (formData: SignInDto) => {
		// useMutation here
		console.log(formData);
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
				<Button type="submit">Sign In</Button>
			</form>
		</Form>
	);
}

export default SignInForm;
