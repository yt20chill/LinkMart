import { axiosWrapper } from "../../lib/apiUtils";
import {
	AcceptOfferDto,
	AcceptOfferPayload,
	PostOfferDto,
	RequestId,
} from "../../schemas/requestSchema";
import {
	AcceptOfferResponseDto,
	OfferDetailsDto,
	acceptOfferResponseSchema,
	requestOffersResponseSchema,
} from "../../schemas/responseSchema";

export {
	acceptOfferAJAX,
	declineOfferAJAX,
	getAllOffersByRequestIdAJAX,
	postOfferAJAX,
};

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

const getAllOffersByRequestIdAJAX = async ({
	requestId,
}: RequestId): Promise<OfferDetailsDto[] | undefined> => {
	return await axiosWrapper<void, OfferDetailsDto[]>(
		`${offerApiRoutes.OFFER_BY_REQUEST}/${requestId}`,
		{
			schema: requestOffersResponseSchema,
		}
	);
};

const declineOfferAJAX = async (offerId: string): Promise<void> => {
	return await axiosWrapper(`${offerApiRoutes.OFFER}/${offerId}`, {
		method: "delete",
	});
};
