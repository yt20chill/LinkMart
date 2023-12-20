import { axiosWrapper } from "../../lib/apiUtils";
import { PostAddressDto, UpdateProfileForm } from "../../schemas/requestSchema";
import {
	AddressDto,
	GetOrderDto,
	RequestDto,
	addressesResponseSchema,
	getOrdersSchema,
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
	await axiosWrapper<PostAddressDto>(userApiRoutes.ADDRESS, {
		method: "post",
		data,
	});
};

const updatePrimaryAddressAJAX = async (addressId: string) => {
	await axiosWrapper(`${userApiRoutes.ADDRESS}/${addressId}`, {
		method: "put",
	});
};

const deleteAddressAJAX = async (addressId: string) => {
	await axiosWrapper(`${userApiRoutes.ADDRESS}/${addressId}`, {
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
