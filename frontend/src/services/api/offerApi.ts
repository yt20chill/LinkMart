import { axiosWrapper } from "../../lib/apiUtils";
import {
	AcceptOfferDto,
	AcceptOfferPayload,
	PostOfferDto,
} from "../../schemas/requestSchema";
import {
	AcceptOfferResponseDto,
	acceptOfferResponseSchema,
} from "../../schemas/responseSchema";

export { acceptOfferAJAX, postOfferAJAX };

const offerApiRoutes = Object.freeze({
	OFFER: `/api/offer`,
});

const postOfferAJAX = async (offerForm: PostOfferDto): Promise<void> => {
	return await axiosWrapper<PostOfferDto>(offerApiRoutes.OFFER, {
		method: "post",
		data: offerForm,
	});
};

const acceptOfferAJAX = async (
	acceptOfferDto: AcceptOfferDto
): Promise<AcceptOfferResponseDto | undefined> => {
	return await axiosWrapper<AcceptOfferPayload, AcceptOfferResponseDto>(
		`${offerApiRoutes.OFFER}/${acceptOfferDto.offerId}`,
		{
			method: "post",
			data: { userAddressId: acceptOfferDto.userAddressId },
			schema: acceptOfferResponseSchema,
		}
	);
};
