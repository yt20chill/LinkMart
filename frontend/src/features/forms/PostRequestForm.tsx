import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
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
import { ImageDto } from "../../schemas/responseSchema";
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
	const { defaultValuesByField, images, primaryImage } =
		useUpdateRequestForm(requestId);
	const [imagesClone, setImagesClone] = useState<Array<ImageDto>>(images);
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

	// Create, clone or edit request
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

	// Owner delete images
	const { mutateAsync: deleteImage } = useMutation({
		mutationFn: deleteRequestImageAJAX,
		onSuccess: async () => {
			toast.success("image deleted");
			await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
		},
	});

	// Form
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

	// reset form on defaultValue change
	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	// initialize imagesClone when images change
	useEffect(() => {
		if (images.length > 0) setImagesClone(images);
	}, [images]);

	// set delete images functions
	const { base64Images, onDelete } = usePreviewFormImages<RequestForm>(
		watch,
		"imageFile",
		setValue
	);
	const removeImageFromArray = ({ imageId }: { imageId: number }) =>
		setImagesClone((prev) => prev.filter((img) => img.imageId !== imageId));
	const onDeleteExisting = isClone ? removeImageFromArray : deleteImage;

	// watch categoryId to display corresponding fields
	const categoryId = +watch("categoryId");

	// reset itemDetail when categoryId changes
	useEffect(() => {
		setValue("itemDetail", {});
	}, [categoryId, setValue]);

	const onSubmit = async (data: RequestForm) => {
		const formData = new FormData();
		appendFormData(data, formData);
		if (isClone)
			appendFormData(
				{
					imageUrl: imagesClone.map((img) => img.imagePath),
				},
				formData
			);
		await mutateRequest(formData);
	};
	return (
		<>
			{categories && locations ? (
				<form className="max-w-lg mx-auto p-12">
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
					<div className="grid grid-cols-5 gap-1">
						{primaryImage && (
							<ImagePreview
								name={primaryImage}
								src={primaryImage}
								canDelete={false}
								onDelete={() => {}}
							/>
						)}
						{base64Images.length > 0 &&
							base64Images
								.reverse()
								.map((img) => (
									<ImagePreview key={img.name} {...img} onDelete={onDelete} />
								))}
						{imagesClone.length > 0 &&
							imagesClone
								.reverse()
								.map((img) => (
									<ImagePreview
										key={img.imageId}
										imageId={img.imageId}
										src={img.imagePath}
										onDelete={onDeleteExisting}
									/>
								))}
					</div>

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
							category={{
								id: categoryId,
								name:
									categories.find(
										(category) => category.categoryId === categoryId
									)?.categoryName ?? "",
							}}
							defaultValuesJSON={
								defaultValuesByField.others.itemDetail ?? undefined
							}
						/>
					)}
					<div className="flex justify-end mt-8 gap-2">
						<FormSubmitButton
							label="Create Post"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
						/>
						<CancelButton
							label="Cancel"
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
