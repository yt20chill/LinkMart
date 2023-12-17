import { axiosWrapper } from "../../lib/apiUtils";
import {
	AcceptOfferDto,
	AcceptOfferPayload,
	PostOfferDto,
} from "../../schemas/requestSchema";
import {
	AcceptOfferResponseDto,
	RequestOfferDto,
	acceptOfferResponseSchema,
	requestOffersResponseSchema,
} from "../../schemas/responseSchema";

export { acceptOfferAJAX, getAllOffersAJAX, postOfferAJAX };

const offerApiRoutes = Object.freeze({
	OFFER: `/api/offer`,
	OFFER_BY_REQUEST: `/api/offer/request`,
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

const getAllOffersAJAX = async (
	requestId: string
): Promise<RequestOfferDto[] | undefined> => {
	return await axiosWrapper<void, RequestOfferDto[]>(
		`${offerApiRoutes.OFFER_BY_REQUEST}/${requestId}`,
		{
			schema: requestOffersResponseSchema,
		}
	);
};
