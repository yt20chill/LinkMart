import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/ui/Button";
import { Form, FormInput, FormSelect } from "../../components/ui/Form";
import { queryKey } from "../../lib/apiUtils";
import { RequestForm } from "../../types/requestModels";
import { postRequestAJAX } from "../api/requestApi";
import { requestSchema } from "./schema/requestSchema";

const PostRequestForm = () => {
	const form = useForm<RequestForm>({
		resolver: zodResolver(requestSchema),
		defaultValues: {
			location: "",
			category: "",
			item: "",
			image: null,
			url: "",
			qty: "",
			remarks: "",
			price: "",
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
		mutationFn: (formData: RequestForm) => {
			const requestDto = requestSchema.parse(formData);
			console.log(requestDto);
			return postRequestAJAX(requestDto);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(queryKey.REQUEST);
		},
	});
	const categories = [
		{
			id: 1,
			name: "Clothes",
		},
		{ id: 2, name: "Computer" },
	];
	const locations = [
		{
			id: 1,
			name: "Japan",
		},
		{ id: 2, name: "United Kingdom" },
	];
	const onSubmit = (formData: RequestForm) => {
		postRequest.mutate(formData);
	};
	if (!categories || !locations)
		return <span className="loading loading-spinner loading-lg"></span>;
	return (
		<Form {...form}>
			<form onSubmit={() => form.handleSubmit(onSubmit)}>
				<FormInput
					formControl={form.control}
					fieldName="item"
					label="Item Name*"
					placeHolder="Item"
				/>
				<FormSelect
					formControl={form.control}
					fieldName="category"
					label="Category*"
					items={categories.map((category) => ({
						id: category.id + "",
						name: category.name,
					}))}
				/>
				<FormSelect
					formControl={form.control}
					fieldName="location"
					label="Location*"
					items={locations.map((location) => ({
						id: location.id + "",
						name: location.name,
					}))}
				/>
				{/* // TODO: change it to drag and drop */}
				{/* <FormInput
					formControl={form.control}
					fieldName="image"
					label="Image*"
					inputType="file"
					placeHolder="Item Image"
				/> */}
				<FormInput
					formControl={form.control}
					fieldName="url"
					placeHolder="Item URL"
				/>
				<FormInput formControl={form.control} fieldName="qty" placeHolder="1" />
				<FormInput
					formControl={form.control}
					fieldName="remarks"
					placeHolder="Urgent"
				/>
				<FormInput
					formControl={form.control}
					fieldName="price"
					label="Price (in HKD) "
					placeHolder="1000"
				/>
			</form>
			<Button type="submit" disabled={postRequest.isLoading}>
				Submit
				{postRequest.isLoading && (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</Button>
		</Form>
	);
};

export default PostRequestForm;
