import { useNavigate, useParams } from "react-router-dom";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import OfferDetailsList from "./components/OfferDetailsList";

const UserRequestDetailsPage = () => {
	const { requestId } = useParams();
	const navigate = useNavigate();
	if (!requestId) navigate(siteMap(RouteEnum.UserRequests), { replace: true });

	return <OfferDetailsList requestId={requestId!} />;
};

export default UserRequestDetailsPage;
