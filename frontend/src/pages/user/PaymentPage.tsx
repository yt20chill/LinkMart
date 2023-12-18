import { useMutation } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CancelButton from "../../components/ui/CancelButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { CreateOrderParams } from "../../schemas/requestSchema";
import { createOrderAJAX } from "../../services/api/orderApi";
import { RouteEnum, siteMap } from "../../services/routes.config";

const PaymentPage = () => {
	const { offerId } = useParams();
	const [searchParams] = useSearchParams();
	const userAddressId = searchParams.get("addressId");
	const price = searchParams.get("price");
	const navigate = useNavigate();
	const { mutateAsync: pay, isLoading } = useMutation({
		mutationFn: (params: CreateOrderParams) => createOrderAJAX(params),
		onSuccess: (result) => {
			if (!result) return;
			toast.success("Payment Success!");
			navigate(`${siteMap(RouteEnum.OrderDetail)}/${result.orderId}`);
		},
	});
	if (!offerId || !userAddressId || !price) {
		toast.error("invalid url, redirect to request page");
		navigate(siteMap(RouteEnum.UserRequests));
	}
	return (
		offerId &&
		userAddressId &&
		price && (
			<>
				<p>Price: {price}</p>
				<PrimaryButton
					label="Pay"
					onClick={() => pay({ success: "true", offerId, userAddressId })}
					disabled={isLoading}
				/>
				<CancelButton
					label="Cancel"
					onClick={() => navigate(siteMap(RouteEnum.UserRequests))}
				/>
			</>
		)
	);
};

export default PaymentPage;
