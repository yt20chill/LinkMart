import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import OfferDetailsList from "./components/OfferDetailsList";

const UserRequestDetailsPage = () => {
	const { requestId } = useParams();
	const navigate = useNavigate();
	const [showAcceptForm, setShowAcceptForm] = useState(false);
	if (!requestId) navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	return (
		<>
			<div>UserRequestDetailsPage</div>
			<ControlModalContext.Provider
				value={{ isShow: showAcceptForm, setIsShow: setShowAcceptForm }}
			>
				<OfferDetailsList requestId={requestId!} />
			</ControlModalContext.Provider>
		</>
	);
};

export default UserRequestDetailsPage;
