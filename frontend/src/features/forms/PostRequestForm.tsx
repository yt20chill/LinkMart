import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CategoryFieldsForm from "../../components/form/CategoryFields";
import FormFileInput from "../../components/form/FormFileInput";
import FormInput from "../../components/form/FormInput";
import FormSelect from "../../components/form/FormSelect";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import ImagePreview from "../../components/form/ImagePreview";
import { FetchError } from "../../lib/apiUtils";
import { appendFormData, emptyObjectToNull } from "../../lib/formUtils";
import {
	RequestForm,
	allowedFileTypes,
	postRequestSchema,
} from "../../schemas/requestSchema";
import {
	deleteRequestImageAJAX,
	postRequestAJAX,
	putRequestAJAX,
} from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";
import { usePreviewFormImages } from "../hooks/usePreviewFormImages";
import { useQueryContainer } from "../hooks/useQueryContainer";
import { useUpdateRequestForm } from "../hooks/useUpdateForm";
import SkeletonForm from "./SkeletonForm";

type PostRequestFormProps = { requestId?: string };

const PostRequestForm = ({ requestId }: PostRequestFormProps) => {
	const {
		defaultValuesByField: { text },
		defaultValues,
		images,
	} = useUpdateRequestForm(requestId);
	const { categories, locations } = useQueryContainer();
	const queryClient = useQueryClient();
	const { mutateAsync: postRequest, isLoading: isPosting } = useMutation({
		mutationFn: (formData: FormData) => {
			return postRequestAJAX(formData);
		},
		onSuccess: async () => {
			toast.success("Request posted!");
			await queryClient.invalidateQueries([queryKey.REQUEST]);
		},
	});
	const { mutateAsync: editRequest, isLoading: isEditing } = useMutation({
		mutationFn: (formData: FormData) => {
			if (!requestId) throw new FetchError(400, "invalid request id");
			return putRequestAJAX(requestId, formData);
		},
		onSuccess: async () => {
			toast.success("edited");
			await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
		},
	});
	const { mutateAsync: deleteImage } = useMutation({
		mutationFn: deleteRequestImageAJAX,
		onSuccess: async () => {
			toast.success("image deleted");
			await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
		},
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
	} = useForm<RequestForm>({
		resolver: zodResolver(postRequestSchema),
		defaultValues,
		mode: "onSubmit",
	});
	const categoryForm = useForm<Record<string, string>>({
		defaultValues: defaultValues.itemDetail,
	});
	const categoryId = watch("categoryId");
	const { base64Images, onDelete } = usePreviewFormImages(
		watch,
		"imageFile",
		setValue
	);
	const onSubmit = async (data: RequestForm) => {
		// append category fields result to form data (as json) first
		const combinedData = {
			...data,
			itemDetail: emptyObjectToNull(categoryForm.getValues()),
		};
		const formData = new FormData();
		appendFormData(combinedData, formData);
		requestId ? await editRequest(formData) : await postRequest(formData);
	};
	return (
		<>
			{categories && locations ? (
				<form>
					{categories && (
						<FormSelect
							register={register}
							required={true}
							errors={errors}
							name="categoryId"
							label="Category"
							optionItems={categories.map((category) => ({
								value: category.categoryId + "",
								displayValue: category.categoryName,
							}))}
						/>
					)}
					{locations && (
						<FormSelect
							register={register}
							required={true}
							errors={errors}
							name="locationId"
							label="Location"
							optionItems={locations.map((location) => ({
								value: location.locationId + "",
								displayValue: location.locationName,
							}))}
						/>
					)}
					<FormFileInput
						name="imageFile"
						register={register}
						setValue={setValue}
						errors={errors}
						multiple={true}
						accept={allowedFileTypes.join(",")}
					/>
					{images.length > 0 &&
						images.map((img) => (
							<ImagePreview
								key={img.imageId}
								imageId={img.imageId}
								src={img.imagePath}
								onDelete={deleteImage}
							/>
						))}
					{base64Images.length > 0 &&
						base64Images.map((img) => (
							<ImagePreview key={img.name} {...img} onDelete={onDelete} />
						))}
					{Object.keys(text).map((field) => (
						<FormInput
							key={field}
							name={field as keyof RequestForm}
							register={register}
							errors={errors}
						/>
					))}
					{categoryId && (
						<CategoryFieldsForm
							register={categoryForm.register}
							errors={categoryForm.formState.errors}
							categoryId={+categoryId}
						/>
					)}
					<FormSubmitButton
						label="Create Post"
						onClick={handleSubmit(onSubmit)}
						disabled={isEditing || isPosting}
					/>
				</form>
			) : (
				<SkeletonForm />
			)}
		</>
	);
};

export default PostRequestForm;
