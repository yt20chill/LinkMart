import { axiosWrapper } from "../../lib/apiUtils";
import { PostAddressDto } from "../../schemas/requestSchema";
import { AddressDto } from "../../schemas/responseSchema";

const userApiRoutes = Object.freeze({
	ADDRESS: "/api/user/address",
});

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
	await axiosWrapper<void, AddressDto>(userApiRoutes.ADDRESS);
};

export {
	deleteAddressAJAX,
	getAddressAJAX,
	postAddressAJAX,
	updatePrimaryAddressAJAX,
};
