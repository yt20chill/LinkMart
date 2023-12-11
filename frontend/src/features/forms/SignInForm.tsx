import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import FormInput from "../../components/form/FormInput";
import { queryKey } from "../../lib/apiUtils";
import { signInAJAX } from "../api/authApi";
import { useNavigateToPreviousPage } from "../hooks/useNavigateToPreviousPage";
import { SignInDto, signInSchema } from "./requestSchema/authSchema";

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
		</form>
	);
};

export default SignInForm;
