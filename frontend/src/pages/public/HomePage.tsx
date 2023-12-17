import { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AcceptOfferForm from "../../features/forms/AcceptOfferForm";
import { OfferDetailsDto } from "../../schemas/responseSchema";
import { ControlModalContext } from "../../services/context/ControlModalContext";

const mockOfferDetails: OfferDetailsDto = {
	offerId: "",
	providerId: "",
	providerName: "Jason",
	efficiency: 5,
	attitude: 5,
	statusName: "Status",
	price: 7000,
	estimatedProcessTime: 10,
	offerRemark: "I can help",
};

function HomePage() {
	const [isShow, setIsShow] = useState(false);
	return (
		<>
			<div>HomePage</div>
			<PrimaryButton
				label="Show Form"
				onClick={() => setIsShow(true)}
			></PrimaryButton>
			<ControlModalContext.Provider value={{ isShow, setIsShow }}>
				<FormModal>
					<AcceptOfferForm offerId="01HHEZNSZ64QBWC6J77YAWHAEY" />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	);
}

export default HomePage;
