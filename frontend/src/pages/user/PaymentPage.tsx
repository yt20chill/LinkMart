import { useParams } from "react-router-dom";

const PaymentPage = () => {
	const { offerId } = useParams();
	return <div>PaymentPage</div>;
};

export default PaymentPage;
