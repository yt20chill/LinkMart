import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ImagePreview from "../../components/form/ImagePreview";
import { Button } from "../../components/ui/Button";
import {
	Form,
	FormFileInput,
	FormInput,
	FormSelect,
} from "../../components/ui/Form";
import { FetchError, queryKey } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	deleteRequestImageAJAX,
	postRequestAJAX,
	putRequestAJAX,
} from "../api/requestApi";
import {
	CategoryDto,
	LocationDto,
	RequestDetailsDto,
} from "../api/responseSchema";
import { usePreviewFormImages } from "../hooks/usePreviewFormImages";
import { RequestForm, postRequestSchema } from "./requestSchema";
import { RequestId } from "./requestSchema/requestSchema";

const categories: CategoryDto[] = [
	{
		categoryId: 1,
		categoryName: "Clothes",
	},
	{ categoryId: 2, categoryName: "Computer" },
];
const locations: LocationDto[] = [
	{
		locationId: 1,
		locationName: "Japan",
	},
	{ locationId: 2, locationName: "United Kingdom" },
];

type PostRequestFormProps = RequestDetailsDto & RequestId;

const PostRequestForm = (
	props: PostRequestFormProps | Record<string, never>
) => {
	const requestId = props?.requestId;
	const defaultValues: RequestForm =
		Object.keys(props).length === 0
			? {
					locationId: "",
					categoryId: "",
					item: "",
					imageFile: [],
					url: "",
					quantity: "1",
					requestRemark: "",
					offerPrice: "",
			  }
			: {
					locationId: props.locationId + "",
					categoryId: props.categoryId + "",
					item: props.item,
					imageFile: [],
					url: props.url,
					quantity: props.quantity + "",
					requestRemark: props.requestRemark,
					offerPrice: props.offerPrice + "",
			  };
	const form = useForm<RequestForm>({
		resolver: zodResolver(postRequestSchema),
		defaultValues,
		mode: "onSubmit",
	});
	const queryClient = useQueryClient();
	// const { data: categories } = useQuery({
	// 	queryKey: [queryKey.REQUEST, "categories"],
	// 	queryFn: getCategory,
	// 	cacheTime: Infinity,
	// });
	// const { data: locations } = useQuery({
	// 	queryKey: [queryKey.REQUEST, "locations"],
	// 	queryFn: getLocation,
	// 	cacheTime: Infinity,
	// });

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
	const { newImages, onDelete } = usePreviewFormImages(
		form.watch,
		"imageFile",
		form.setValue
	);
	const { mutateAsync: deleteImage } = useMutation({
		mutationFn: deleteRequestImageAJAX,
		onSuccess: async () => {
			toast.success("image deleted");
			await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
		},
	});
	const onSubmit = async (data: RequestForm) => {
		const formData = appendFormData(data);
		requestId ? await editRequest(formData) : await postRequest(formData);
	};
	if (!categories || !locations)
		return <span className="loading loading-spinner loading-lg"></span>;
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-8 mx-10"
			>
				<FormInput
					formControl={form.control}
					fieldName="item"
					label="Item Name*"
					placeHolder="Item"
				/>
				<FormSelect
					formControl={form.control}
					fieldName="categoryId"
					label="Category*"
					items={categories.map((category) => ({
						id: category.categoryId + "",
						name: category.categoryName,
					}))}
				/>
				<FormSelect
					formControl={form.control}
					fieldName="locationId"
					label="Location*"
					items={locations.map((location) => ({
						id: location.locationId + "",
						name: location.locationName,
					}))}
				/>
				{/* // TODO: change it to drag and drop */}
				<FormFileInput
					formControl={form.control}
					fieldName="imageFile"
					label="Images*"
				/>
				<FormInput
					formControl={form.control}
					fieldName="url"
					placeHolder="Item URL"
				/>
				<FormInput
					formControl={form.control}
					fieldName="quantity"
					placeHolder="1"
				/>
				<FormInput
					formControl={form.control}
					fieldName="requestRemark"
					placeHolder="Urgent"
				/>
				<FormInput
					formControl={form.control}
					fieldName="offerPrice"
					label="Price (in HKD) "
					placeHolder="1000"
				/>
				{requestId &&
					props.images.map((image) => (
						<ImagePreview
							key={image.imageId}
							imageId={image.imageId}
							src={image.imagePath}
							onDelete={deleteImage}
						/>
					))}
				{newImages &&
					newImages.map((image) => (
						<ImagePreview key={image.name} onDelete={onDelete} {...image} />
					))}
				<Button type="submit" disabled={isEditing || isPosting}>
					Submit
					{(isEditing || isPosting) && (
						<span className="loading loading-spinner loading-lg"></span>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default PostRequestForm;
