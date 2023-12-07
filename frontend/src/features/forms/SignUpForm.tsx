import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/shadcn/Button";
import { Form, FormInput } from "../../components/ui/shadcn/Form";
import { SignUpDto, signUpSchema } from "../../types/authModels";

function SignUpForm() {
	const form = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit((formData) => onSubmit(formData));
	};
	const onSubmit = (formData: SignUpDto) => {
		console.log(formData);
	};

	return (
		<Form {...form}>
			<form onSubmit={submit} className="space-y-8">
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
				<Button type="submit">Sign Up</Button>
			</form>
		</Form>
	);
}

export default SignUpForm;
