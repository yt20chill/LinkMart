import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
	FormFileInput,
	FormSelect,
	FormSubmitButton,
} from "../../components/form";
import {
	TApplyProviderForm,
	applyProviderSchema,
} from "../../schemas/requestSchema";
import { applyProviderAJAX } from "../../services/api/providerApi";
import { queryKey } from "../../services/query.config";
import { useQueryContainer } from "../hooks/useQueryContainer";
import SkeletonForm from "./SkeletonForm";

const defaultValues: TApplyProviderForm = {
	locationId: "",
	addressDocument: null,
	idDocument: null,
	bankDocument: null,
};

const ApplyProviderForm = () => {
	const queryClient = useQueryClient();
	const { locations } = useQueryContainer();
	const { mutateAsync: applyProvider, isLoading } = useMutation({
		mutationFn: applyProviderAJAX,
		onSuccess: async () => {
			await queryClient.invalidateQueries([queryKey.AUTH]);
		},
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<TApplyProviderForm>({
		resolver: zodResolver(applyProviderSchema),
		defaultValues,
	});
	const onSubmit = async (form: TApplyProviderForm) => {
		await applyProvider(form);
	};
	if (!locations) return <SkeletonForm />;
	return (
		<form>
			<FormSelect
				name="locationId"
				register={register}
				errors={errors}
				optionItems={locations.map(({ locationId, locationName }) => ({
					value: locationId + "",
					displayValue: locationName,
				}))}
			/>
			{Object.keys(defaultValues)
				.filter((key) => key !== "locationId")
				.map((key) => (
					<FormFileInput
						key={key}
						name={key as keyof TApplyProviderForm}
						register={register}
						errors={errors}
					/>
				))}
			<FormSubmitButton onClick={handleSubmit(onSubmit)} disabled={isLoading} />
		</form>
	);
};

export default ApplyProviderForm;
