import { axiosWrapper } from "../../lib/apiUtils";
import { PostAddressDto } from "../../schemas/requestSchema";
import {
	AddressDto,
	GetOrderDto,
	addressesResponseSchema,
	getOrdersSchema,
} from "../../schemas/responseSchema";

const userApiRoutes = Object.freeze({
	ADDRESS: "/api/user/address",
	ORDER: "/api/user/order",
});

export {
	deleteAddressAJAX,
	getAddressAJAX,
	getOrdersByUserAJAX,
	postAddressAJAX,
	updatePrimaryAddressAJAX,
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
