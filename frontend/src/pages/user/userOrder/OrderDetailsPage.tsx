import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderCard } from "../../../components/card/OrderCard";
import { DetailInfoDisplay } from "../../../components/display/DetailInfoDisplay";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import { GetOrderDto } from "../../../schemas/responseSchema";
import { orderDetailsAJAX } from "../../../services/api/orderApi";
import { queryKey } from "../../../services/query.config";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import { OrderStatuses, orderStatuses } from "../../../types/sharePropsModel";

const OrderDetailsPage = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	if (!orderId) {
		toast.error("Order not found");
		navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	}
	const { data: details, isLoading } = useQuery({
		queryKey: [queryKey.ORDER, { orderId }],
		queryFn: () => orderDetailsAJAX(orderId!),
		enabled: !!orderId,
	});
	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;
	const {
		orderStatus,
		providerId,
		providerName,
		item,
		primaryImage,
		quantity,
		price,
		estimatedProcessTime,
		createdAt,
		locationName,
		itemDetail,
		url,
		requestRemark,
		offerPrice,
	} = details;

	const orderDto: GetOrderDto = {
		orderId: orderId!,
		orderStatus,
		providerId,
		providerName,
		item,
		primaryImage,
		quantity,
		price,
		estimatedProcessTime,
		createdAt,
	};

	const requestDetailsDto = {
		locationName,
		itemDetail,
		requestRemark,
		offerPrice,
		url,
	};
	return (
		<>
			<OrderCard {...orderDto} />
			<DetailInfoDisplay {...requestDetailsDto} />
			<ProgressBar
				steps={[...orderStatuses]}
				currentStep={orderStatus as OrderStatuses}
			/>
		</>
	);
};

export default OrderDetailsPage;
