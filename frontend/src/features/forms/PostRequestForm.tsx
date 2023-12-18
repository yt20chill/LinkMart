import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	CategoryFieldsForm,
	FormInput,
	FormSelect,
	FormSubmitButton,
	ImagePreview,
} from "../../components/form";
import FormFileInput from "../../components/form/FormFileInput";
import CancelButton from "../../components/ui/CancelButton";
import { appendFormData } from "../../lib/formUtils";
import {
	RequestForm,
	allowedFileTypes,
	postRequestSchema,
} from "../../schemas/requestSchema";
import {
	cloneRequestAJAX,
	deleteRequestImageAJAX,
	postRequestAJAX,
	putRequestAJAX,
} from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { usePreviewFormImages } from "../hooks/usePreviewFormImages";
import { useQueryContainer } from "../hooks/useQueryContainer";
import {
	RequestFormTextFields,
	useUpdateRequestForm,
} from "../hooks/useUpdateForm";
import SkeletonForm from "./SkeletonForm";

const PostRequestForm = () => {
	const [searchParams] = useSearchParams();
	const requestId =
		searchParams.get("cloneId") || searchParams.get("requestId");
	const isClone = searchParams.has("cloneId");
	const { defaultValuesByField, images } = useUpdateRequestForm(requestId);
	const defaultValues = useMemo(
		() => ({
			...defaultValuesByField.text,
			...defaultValuesByField.dropDown,
		}),
		[defaultValuesByField]
	);
	const { categories, locations } = useQueryContainer();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutateAsync: mutateRequest, isLoading } = useMutation({
		mutationFn: (formData: FormData) => {
			if (isClone) return cloneRequestAJAX(formData);
			if (requestId) return putRequestAJAX(requestId, formData);
			return postRequestAJAX(formData);
		},
		onSuccess: async (result) => {
			if (!result) return toast.error("Something went wrong");
			toast.success("Request posted!");
			await queryClient.invalidateQueries([queryKey.REQUEST]);
			navigate(`${siteMap(RouteEnum.RequestDetail)}/${result.requestId}`, {
				replace: true,
			});
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
		reset,
	} = useForm<RequestForm>({
		resolver: zodResolver(
			requestId
				? postRequestSchema.omit({ imageFile: true })
				: postRequestSchema
		),
		defaultValues,
		mode: "onSubmit",
	});
	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const categoryId = watch("categoryId");
	const { base64Images, onDelete } = usePreviewFormImages<RequestForm>(
		watch,
		"imageFile",
		setValue
	);
	useEffect(() => {
		setValue("itemDetail", {});
	}, [categoryId, setValue]);
	const onSubmit = async (data: RequestForm) => {
		// append category fields result to form data (as json) first
		const formData = new FormData();
		appendFormData(data, formData);
		if (isClone)
			appendFormData(
				{
					imageUrl: images.map((img) => img.imagePath),
				},
				formData
			);
		await mutateRequest(formData);
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
							defaultValue={defaultValuesByField.dropDown.categoryId}
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
							defaultValue={defaultValuesByField.dropDown.locationId}
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
					{/* TODO: Allow user to delete default images */}
					{base64Images.length > 0 &&
						base64Images
							.reverse()
							.map((img) => (
								<ImagePreview key={img.name} {...img} onDelete={onDelete} />
							))}
					{images.length > 0 &&
						images
							.reverse()
							.map((img) => (
								<ImagePreview
									key={img.imageId}
									imageId={img.imageId}
									src={img.imagePath}
									onDelete={deleteImage}
									canDelete={!isClone}
								/>
							))}

					{Object.keys(defaultValuesByField.text).map((field) => (
						<FormInput
							key={field}
							name={field as keyof RequestForm}
							defaultValue={
								defaultValuesByField.text[field as keyof RequestFormTextFields]
							}
							register={register}
							errors={errors}
						/>
					))}
					{categoryId && (
						<CategoryFieldsForm
							keyName="itemDetail"
							register={
								register as unknown as UseFormRegister<Record<string, unknown>>
							}
							errors={errors as FieldErrors<Record<string, string>>}
							categoryId={+categoryId}
							defaultValuesJSON={
								defaultValuesByField.others.itemDetail ?? undefined
							}
						/>
					)}
					<div className="flex">
						<FormSubmitButton
							className="mt-5"
							label="Create Post"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
						/>
						<CancelButton
							className="ms-5 mt-5"
							label="Back"
							onClick={(e) => {
								e.preventDefault();
								navigate(-1);
							}}
						/>
					</div>
				</form>
			) : (
				<SkeletonForm />
			)}
		</>
	);
};

export default PostRequestForm;
