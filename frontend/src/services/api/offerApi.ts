import { axiosWrapper } from "../../lib/apiUtils";
import { OfferForm } from "../../schemas/requestSchema/offerSchema";
import { offerApiRoutes } from "../query.config";

export const postOfferAJAX = async (offerForm: OfferForm): Promise<void> => {
	return await axiosWrapper<OfferForm>(offerApiRoutes.OFFER, {
		method: "post",
		data: offerForm,
	});
};
