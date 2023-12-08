import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/ui/Button";
import { queryKey } from "../../lib/apiUtils";
import { RequestForm } from "../../types/requestModels";
import { postRequestAJAX } from "../api/requestApi";
import { requestSchema } from "./schema/requestSchema";

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

const PostRequestFormRaw = () => {
	const { register, handleSubmit, setError } = useForm<RequestForm>();
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

	const onSubmit = (data: RequestForm) => {
		if (data.images?.length < 1) {
			return setError("images", { message: "Image is required" });
		}
		const formData = new FormData();
		const images = data.image as unknown as FileList;
		for (const image of images) {
			formData.append("files", image);
		}
		console.log(data);
		// postRequest.mutate(formData);
	};
	if (!categories || !locations)
		return <span className="loading loading-spinner loading-lg"></span>;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>
				Item: <input {...register("item")} />
			</p>
			<p>
				Category:
				<select {...register("category")}>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
			</p>
			<p>
				Image: <input type="file" {...register("image")}></input>
			</p>
			<Button type="submit" disabled={postRequest.isLoading}>
				Submit
				{postRequest.isLoading && (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</Button>
		</form>
	);
};

export default PostRequestFormRaw;
