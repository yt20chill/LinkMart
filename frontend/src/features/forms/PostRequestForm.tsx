import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/shadcn/Form";
import { RequestForm } from "../../types/requestModels";
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

	return (
		<Form {...form}>
			<form></form>
		</Form>
	);
};

export default PostRequestForm;
