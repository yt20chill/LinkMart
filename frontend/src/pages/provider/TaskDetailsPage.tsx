import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "../../components/skeletons/Skeleton";
import Loading from "../../components/ui/Loading";
import { useGuardedQueryContainer } from "../../features/hooks/useGuardedQueryContainer";
import OrderDetails from "../../features/order/OrderDetails";
import { OrderDetailsContext } from "../../services/context/OrderDetailsContext";

const TaskDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Invalid order id");
		navigate(-1);
	}
	const { data: details, isLoading } =
		useGuardedQueryContainer().useOrderDetails(orderId!);
	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;

	return (
		<OrderDetailsContext.Provider value={details}>
			<OrderDetails />
		</OrderDetailsContext.Provider>
	);
};

export default TaskDetailsPage;
