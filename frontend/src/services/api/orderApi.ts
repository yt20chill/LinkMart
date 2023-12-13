import { axiosWrapper } from "../../lib/apiUtils";
import { AcceptOfferDto } from "../../schemas/requestSchema";
import { AcceptOfferResponseDto } from "../../schemas/responseSchema";

const orderApiRoutes = Object.freeze({
	ORDER: "/api/order",
});

const acceptOfferAJAX = async (acceptOfferDto: AcceptOfferDto) => {
	return await axiosWrapper<AcceptOfferDto, AcceptOfferResponseDto>(
		orderApiRoutes.ORDER,
		{
			method: "post",
			data: acceptOfferDto,
		}
	);
};

export { acceptOfferAJAX };
