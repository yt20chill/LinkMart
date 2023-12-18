import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderCard } from "../../components/card/OrderCard";
import Loading from "../../components/ui/Loading";
import ProgressBar from "../../components/ui/ProgressBar";
import { orderStatuses } from "../../lib/utils";
import { orderDetailsAJAX } from "../../services/api/orderApi";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";

const OrderDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Order not found");
		navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	}
	const { data: details } = useQuery({
		queryKey: [queryKey.ORDER, { orderId }],
		queryFn: () => orderDetailsAJAX(orderId!),
	});
	if (!details) return <Loading />;
	const {
		requestId,
		updatedAt,
		locationName,
		images,
		itemDetail,
		url,
		requestRemark,
		createdBy,
		orderStatus,
		...orderDto
	} = details;

	return (
		<>
			<OrderCard {...orderDto} orderStatus={orderStatus} />
			<ProgressBar steps={[...orderStatuses]} currentStep={orderStatus} />
		</>
	);
};

export default OrderDetailsPage;
