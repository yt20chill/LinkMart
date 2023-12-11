import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CategoryFieldsForm from "../../components/form/CategoryFields";
import FormFileInput from "../../components/form/FormFileInput";
import FormInput from "../../components/form/FormInput";
import FormSelect from "../../components/form/FormSelect";
import ImagePreview from "../../components/form/ImagePreview";
import { FetchError, queryKey } from "../../lib/apiUtils";
import { appendFormData, printFormData } from "../../lib/formUtils";
import {
	deleteRequestImageAJAX,
	postRequestAJAX,
	putRequestAJAX,
} from "../api/requestApi";
import { usePreviewFormImages } from "../hooks/usePreviewFormImages";
import { useUpdateRequestForm } from "../hooks/useUpdateForm";
import {
	RequestForm,
	allowedFileTypes,
	postRequestSchema,
} from "./requestSchema";

const categories = [
	{ categoryId: 1, categoryName: "Clothes" },
	{ categoryId: 2, categoryName: "Shoes" },
];

const locations = [
	{ locationId: 1, locationName: "Singapore" },
	{ locationId: 2, locationName: "Malaysia" },
];

type PostRequestFormProps = { requestId?: string };

const PostRequestForm = ({ requestId }: PostRequestFormProps) => {
	const {
		defaultValuesByField: { text },
		defaultValues,
		images,
	} = useUpdateRequestForm(requestId);
	// const { data: categories } = useQuery({
	// 	queryKey: [queryKey.REQUEST, "categories"],
	// 	queryFn: getAllCategories,
	// 	cacheTime: Infinity,
	// });
	// const { data: locations } = useQuery({
	// 	queryKey: [queryKey.REQUEST, "locations"],
	// 	queryFn: getAllLocations,
	// 	cacheTime: Infinity,
	// });
	const [formData, setFormData] = useState<FormData>(new FormData());
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
	console.log({ base64Images, file: watch("imageFile") });
	const onSubmitBaseForm = async (data: RequestForm) => {
		// setFormData((formData) => appendFormData(data, formData));
		setFormData((formData) =>
			appendFormData(
				{ itemDetail: JSON.stringify(categoryForm.getValues()) },
				formData
			)
		);
		setFormData((formData) => appendFormData(data, formData));
		printFormData(formData);
		requestId ? await editRequest(formData) : await postRequest(formData);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmitBaseForm)}>
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
				<input type="submit" value="Submit" disabled={isEditing || isPosting} />
				{(isEditing || isPosting) && (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</form>
		</>
	);
};

export default PostRequestForm;
