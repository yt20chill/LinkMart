import { textToTitleCase } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FormImageInput,
	FormInput,
	FormSelect,
	FormSubmitButton,
	FormTextAreaInput,
	ImagePreview,
} from "../../components/form";
import CancelButton from "../../components/ui/CancelButton";
import { appendFormData } from "../../lib/formUtils";
import {
	EditRequestDto,
	PostRequestDto,
	RequestForm,
	allowedFileTypes,
	editRequestSchema,
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
import { useQueryContainer } from "../hooks/useQueryContainer";
import {
	RequestFormTextFields,
	useUpdateRequestForm,
} from "../hooks/useUpdateForm";
import CategoryFieldsForm from "./CategoryFields";
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
			// clone or post => invalidate whole request list,
			// edit => invalidate only that particular request
			const key =
				requestId && !isClone
					? [queryKey.REQUEST, { requestId }]
					: [queryKey.REQUEST];
			await queryClient.invalidateQueries(key);
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
		resolver: zodResolver(requestId ? editRequestSchema : postRequestSchema),
		defaultValues,
		mode: "onBlur",
	});

	// reset form on defaultValue change
	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	// initialize imagesClone when images change
	// remove primaryImage from imagesClone
	useEffect(() => {
		if (images.length > 0)
			setImagesClone(images.filter((img) => img.imagePath !== primaryImage));
	}, [images, primaryImage]);

	const removeImageFromArray = ({ imageId }: { imageId: number }) =>
		setImagesClone((prev) => prev.filter((img) => img.imageId !== imageId));
	const onDeleteExisting = isClone ? removeImageFromArray : deleteImage;

	// watch categoryId to display corresponding fields
	const categoryId = +watch("categoryId");

	// reset itemDetail when categoryId changes
	useEffect(() => {
		setValue("itemDetail", {});
	}, [categoryId, setValue]);

	const onSubmit = async (_data: unknown) => {
		const data = _data as PostRequestDto | EditRequestDto;
		const formData = appendFormData(data);
		if (isClone)
			appendFormData(
				{
					imageUrl: imagesClone
						.map((img) => img.imagePath)
						.concat(primaryImage ?? []),
				},
				formData
			);
		await mutateRequest(formData);
	};

	return (
		<>
			{categories && locations ? (
				<form className="max-w-lg mx-auto p-12">
					<div className="inline-flex border-b-8  border-slate-300 text-xl font-bold text-slate-500">
						{isClone
							? `Clone ${defaultValues.item}`
							: requestId
							? `Edit ${defaultValues.item}`
							: "Create Request"}
					</div>
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
								displayValue: textToTitleCase(category.categoryName),
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
					<FormImageInput
						name="imageFile"
						register={register}
						watch={watch}
						setValue={setValue}
						errors={errors}
						multiple={true}
						accept={allowedFileTypes.join(",")}
					/>
					<div className="grid grid-cols-3 md:grid-cols-5 gap-1">
						{primaryImage && (
							<ImagePreview
								name={primaryImage}
								src={primaryImage}
								canDelete={false}
								onDelete={() => {}}
							/>
						)}

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

					{Object.keys(defaultValuesByField.text).map((field) =>
						/remark/gi.test(field) ? (
							<FormTextAreaInput
								key={field}
								name={field as keyof RequestForm}
								defaultValue={
									defaultValuesByField.text[
										field as keyof RequestFormTextFields
									]
								}
								register={register}
								errors={errors}
							/>
						) : (
							<FormInput
								key={field}
								name={field as keyof RequestForm}
								defaultValue={
									defaultValuesByField.text[
										field as keyof RequestFormTextFields
									]
								}
								register={register}
								errors={errors}
							/>
						)
					)}
					{categoryId ? (
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
					) : null}
					<div className="flex justify-end mt-8 gap-2">
						<FormSubmitButton
							label="Confirm"
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
