import { useNavigate, useParams } from "react-router-dom";
import OfferDetailsList from "./components/OfferDetailsList";

const UserRequestDetailsPage = () => {
	const { requestId } = useParams();
	const navigate = useNavigate();
	// if (!requestId) navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	console.log(requestId);

	return <OfferDetailsList requestId={requestId!} />;
};

export default UserRequestDetailsPage;
