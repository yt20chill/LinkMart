import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UploadShippingForm from "../../features/forms/UploadShippingForm";

const TaskDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Invalid order id");
		navigate(-1);
	}
	return <UploadShippingForm orderId={orderId!} />;
};

export default TaskDetailsPage;
