import { axiosWrapper } from "../../lib/apiUtils";
import { PostOfferDto } from "../../schemas/requestSchema";

const offerApiRoutes = Object.freeze({
	OFFER: `/api/offer`,
});

export const postOfferAJAX = async (offerForm: PostOfferDto): Promise<void> => {
	return await axiosWrapper<PostOfferDto>(offerApiRoutes.OFFER, {
		method: "post",
		data: offerForm,
	});
};
