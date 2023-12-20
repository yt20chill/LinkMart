import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormModal from "../../components/modal/FormModal";
import EditButton from "../../components/ui/EditButton";
import Loading from "../../components/ui/Loading";
import OfferForm from "../../features/forms/OfferForm";
import { generateDefaultValues } from "../../lib/formUtils";
import { TOfferForm, offerSchema } from "../../schemas/requestSchema";
import { getProviderOfferDetailAJAX } from "../../services/api/offerApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";

const defaultEmptyForm: TOfferForm = generateDefaultValues(offerSchema);

const OfferDetailsPage = () => {
	const { offerId } = useParams();
	const navigate = useNavigate();
	if (!offerId) {
		toast.error("Offer not found");
		navigate("/404", { replace: true });
	}
	const { data: offer, isLoading: isGetting } = useQuery({
		queryKey: [queryKey.OFFER, { offerId }],
		queryFn: () => getProviderOfferDetailAJAX(offerId!),
		enabled: !!offerId,
	});

	const [showEditForm, setShowEditForm] = useState(false);
	if (isGetting) return <Loading />;
	const defaultValues: TOfferForm = offer
		? {
				estimatedProcessTime: offer.estimatedProcessTime + "",
				price: offer.price + "",
				offerRemark: offer.offerRemark ?? "",
		  }
		: defaultEmptyForm;
	return (
		<>
			{offer && <div>{JSON.stringify(offer)}</div>}
			<EditButton
				label="Edit Offer"
				onClick={(e) => {
					e.preventDefault();
					setShowEditForm(true);
				}}
			/>
			<ControlModalContext.Provider
				value={{ isShow: showEditForm, setIsShow: setShowEditForm }}
			>
				<FormModal>
					<OfferForm offerId={offerId!} defaultValues={defaultValues} />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
};

export default OfferDetailsPage;
