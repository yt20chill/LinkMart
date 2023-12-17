import { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AcceptOfferForm from "../../features/forms/AcceptOfferForm";
import { ControlModalContext } from "../../services/context/closeModalContext";

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
