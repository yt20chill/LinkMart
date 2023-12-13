import { axiosWrapper } from "../../lib/apiUtils";
import { PostOfferDto } from "../../schemas/requestSchema";

import { offerApiRoutes } from "../query.config";

export const postOfferAJAX = async (offerForm: PostOfferDto): Promise<void> => {
	return await axiosWrapper<PostOfferDto>(offerApiRoutes.OFFER, {
		method: "post",
		data: offerForm,
	});
};
