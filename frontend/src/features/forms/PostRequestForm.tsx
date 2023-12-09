import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/ui/Button";
import {
	Form,
	FormFileInput,
	FormInput,
	FormSelect,
} from "../../components/ui/Form";
import { queryKey } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import { CategoriesResult, LocationsResult } from "../../types/fetchModels";
import { RequestForm } from "../../types/requestModels";
import { postRequestAJAX } from "../api/requestApi";
import { requestSchema } from "./schema/requestSchema";

const categories: CategoriesResult = [
	{
		categoryId: 1,
		categoryName: "Clothes",
	},
	{ categoryId: 2, categoryName: "Computer" },
];
const locations: LocationsResult = [
	{
		locationId: 1,
		locationName: "Japan",
	},
	{ locationId: 2, locationName: "United Kingdom" },
];

const PostRequestForm = () => {
	const form = useForm<RequestForm>({
		resolver: zodResolver(requestSchema),
		defaultValues: {
			locationId: "",
			categoryId: "",
			item: "",
			imageFile: null,
			url: "",
			quantity: "1",
			requestRemark: "",
			offerPrice: "",
		},
		mode: "onBlur",
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

	const postRequest = useMutation({
		mutationFn: (formData: FormData) => {
			return postRequestAJAX(formData);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(queryKey.REQUEST);
		},
	});

	const onSubmit = (data: RequestForm) => {
		const formData = appendFormData(data);

		postRequest.mutate(formData);
	};
	if (!categories || !locations)
		return <span className="loading loading-spinner loading-lg"></span>;
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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
				<Button type="submit" disabled={postRequest.isLoading}>
					Submit
					{postRequest.isLoading && (
						<span className="loading loading-spinner loading-lg"></span>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default PostRequestForm;
