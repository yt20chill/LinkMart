import { axiosWrapper } from "../../lib/apiUtils";
import {
	AcceptOfferDto,
	AcceptOfferPayload,
	RequestId,
} from "../../schemas/requestSchema";
import {
	OfferDto,
	TOfferForm,
	offerSchema,
} from "../../schemas/requestSchema/offerSchema";
import {
	AcceptOfferResponseDto,
	HasOfferedDto,
	OfferDetailsDto,
	ProviderOfferDetailDto,
	ProviderOfferDto,
	acceptOfferResponseSchema,
	hasOfferedResponseSchema,
	providerOfferDetailSchema,
	providerOffersResponseSchema,
	requestOffersResponseSchema,
} from "../../schemas/responseSchema";

export {
	acceptOfferAJAX,
	checkHasOfferedAJAX,
	declineOfferAJAX,
	deleteOfferAJAX,
	getAllOffersByRequestIdAJAX,
	getProviderOfferDetailAJAX,
	getProviderOffersAJAX,
	postOfferAJAX,
	putOfferAJAX,
};

const offerApiRoutes = Object.freeze({
	OFFER: `/api/offer`,
	OFFER_BY_REQUEST: `/api/offer/request`,
	HAS_OFFERED: `/api/request/provider`,
});

const postOfferAJAX = async (
	requestId: string,
	form: TOfferForm
): Promise<void> => {
	const data = offerSchema.parse(form);
	return await axiosWrapper<OfferDto & { requestId: string }>(
		offerApiRoutes.OFFER,
		{
			method: "post",
			data: { ...data, requestId },
		}
	);
};

const putOfferAJAX = async (
	offerId: string,
	form: TOfferForm
): Promise<void> => {
	const data = offerSchema.parse(form);
	return await axiosWrapper<OfferDto>(`${offerApiRoutes.OFFER}/${offerId}`, {
		method: "put",
		data,
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
	return await axiosWrapper(`${offerApiRoutes.OFFER}/${offerId}/rejected`, {
		method: "delete",
	});
};

const deleteOfferAJAX = async (offerId: string) => {
	return await axiosWrapper(`${offerApiRoutes.OFFER}/${offerId}/aborted`, {
		method: "delete",
	});
};

const getProviderOffersAJAX = async () => {
	return await axiosWrapper<void, ProviderOfferDto[]>(
		`${offerApiRoutes.OFFER}/myOffer`,
		{
			schema: providerOffersResponseSchema,
		}
	);
};

const getProviderOfferDetailAJAX = async (offerId: string) => {
	return await axiosWrapper<void, ProviderOfferDetailDto>(
		`${offerApiRoutes.OFFER}/${offerId}`,
		{
			schema: providerOfferDetailSchema,
		}
	);
};

const checkHasOfferedAJAX = async (requestId: string) => {
	return await axiosWrapper<void, HasOfferedDto>(
		`${offerApiRoutes.HAS_OFFERED}/${requestId}`,
		{ schema: hasOfferedResponseSchema }
	);
};
