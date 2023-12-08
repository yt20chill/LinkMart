import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Form, FormSelect } from "../../components/ui/shadcn/Form";
import { queryKey } from "../../lib/apiUtils";
import { RequestForm } from "../../types/requestModels";
import { getCategory, getLocation } from "../api/requestApi";
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
	});

	const { data: categories } = useQuery({
		queryKey: [queryKey.REQUEST, "categories"],
		queryFn: getCategory,
		cacheTime: Infinity,
	});
	const { data: locations } = useQuery({
		queryKey: [queryKey.REQUEST, "locations"],
		queryFn: getLocation,
		cacheTime: Infinity,
	});
	if (!categories || !locations)
		return <span className="loading loading-spinner loading-lg"></span>;
	return (
		<Form {...form}>
			<form>
				<FormSelect
					formControl={form.control}
					fieldName="category"
					items={categories.map((category) => ({
						id: category.id + "",
						name: category.name,
					}))}
				/>
				<FormSelect
					formControl={form.control}
					fieldName="location"
					items={locations.map((location) => ({
						id: location.id + "",
						name: location.name,
					}))}
				/>
			</form>
		</Form>
	);
};

export default PostRequestForm;
