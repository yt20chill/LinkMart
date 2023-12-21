import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderCard } from "../../components/card/OrderCard";
import { DetailInfoDisplay } from "../../components/display/DetailInfoDisplay";
import Skeleton from "../../components/skeletons/Skeleton";
import Loading from "../../components/ui/Loading";
import ProgressBar from "../../components/ui/ProgressBar";
import UploadShippingForm from "../../features/forms/UploadShippingForm";
import { useGuardedQueryContainer } from "../../features/hooks/useGuardedQueryContainer";
import { GetOrderDto } from "../../schemas/responseSchema";
import { OrderStatuses, orderStatuses } from "../../types/sharePropsModel";

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

	const requestInfoDto = {
		locationName,
		itemDetail,
		requestRemark,
		offerPrice,
		url,
	};
	if (isLoading) return <Loading />;
	if (!details) return <Skeleton />;
	return (
		<>
			<ProgressBar
				steps={[...orderStatuses]}
				currentStep={orderStatus as OrderStatuses}
			/>
			<OrderCard {...orderDto} />
			<DetailInfoDisplay {...requestInfoDto} />
			{/progress/gi.test(orderStatus) && (
				<UploadShippingForm orderId={orderId!} />
			)}
		</>
	);
};

export default TaskDetailsPage;
