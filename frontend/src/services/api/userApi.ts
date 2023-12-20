import { axiosWrapper } from "../../lib/apiUtils";
import { PostAddressDto, UpdateProfileForm } from "../../schemas/requestSchema";
import {
	AddressDto,
	GetOrderDto,
	PostAddressResponseDto,
	RequestDto,
	addressesResponseSchema,
	getOrdersSchema,
	postAddressResponseSchema,
	requestsResponseSchema,
} from "../../schemas/responseSchema";
const baseUserApiRoute = `/api/user`;

const userApiRoutes = Object.freeze({
	ADDRESS: `${baseUserApiRoute}/address`,
	ORDER: `${baseUserApiRoute}/order`,
	REQUEST: `/api/request`,
	PROFILE: `${baseUserApiRoute}/info`,
});

export {
	deleteAddressAJAX,
	getAddressAJAX,
	getOrdersByUserAJAX,
	getRequestsByUserAJAX,
	postAddressAJAX,
	updatePrimaryAddressAJAX,
	updateProfileAJAX,
};

const postAddressAJAX = async (data: PostAddressDto) => {
	return await axiosWrapper<PostAddressDto, PostAddressResponseDto>(
		userApiRoutes.ADDRESS,
		{
			method: "post",
			data,
			schema: postAddressResponseSchema,
		}
	);
};

const updatePrimaryAddressAJAX = async (addressId: string) => {
	return await axiosWrapper(`${userApiRoutes.ADDRESS}/${addressId}`, {
		method: "put",
	});
};

const deleteAddressAJAX = async (addressId: string) => {
	return await axiosWrapper(`${userApiRoutes.ADDRESS}/${addressId}`, {
		method: "delete",
	});
};

const getAddressAJAX = async () => {
	return (
		(await axiosWrapper<void, AddressDto[]>(userApiRoutes.ADDRESS, {
			schema: addressesResponseSchema,
		})) ?? []
	);
};

const getOrdersByUserAJAX = async () => {
	return await axiosWrapper<void, GetOrderDto[]>(userApiRoutes.ORDER, {
		schema: getOrdersSchema,
	});
};

const getRequestsByUserAJAX = async () => {
	return await axiosWrapper<void, RequestDto[]>(userApiRoutes.REQUEST, {
		schema: requestsResponseSchema,
	});
};

const updateProfileAJAX = async (data: UpdateProfileForm) => {
	return await axiosWrapper<UpdateProfileForm>(userApiRoutes.PROFILE, {
		method: "put",
		data,
	});
};
