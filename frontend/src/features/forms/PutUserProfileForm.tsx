import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import {
	UpdateProfileForm,
	putProfileSchema,
} from "../../schemas/requestSchema";
import { useAuthStore } from "../../services/stores/authStore";

const PutUserProfileForm = () => {
	const username = useAuthStore(useShallow((state) => state.username));
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateProfileForm>({
		resolver: zodResolver(putProfileSchema),
	});
	return <div>PutUserProfile</div>;
};

export default PutUserProfileForm;
