import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	EditProviderProfileForm,
	TApplyProviderForm,
} from "../../schemas/requestSchema";
import {
	ApplyProviderDto,
	GetApplicationStatusDto,
	GetProviderProfileDto,
	getApplicationStatusResponseSchema,
	getProviderProfileSchema,
	postProviderDtoSchema,
} from "../../schemas/responseSchema";

export {
	abortApplicationAJAX,
	applyProviderAJAX,
	editProviderProfileAJAX,
	getProviderApplicationStatusAJAX,
	getProviderProfileAJAX,
};

const providerApiRoutes = {
	PROVIDER: "/api/provider",
	PROFILE: "/api/provider/profile",
};

const applyProviderAJAX = async (form: TApplyProviderForm) => {
	return await axiosWrapper<FormData, ApplyProviderDto>(
		providerApiRoutes.PROVIDER,
		{
			method: "post",
			data: appendFormData(form),
			schema: postProviderDtoSchema,
		}
	);
};

const getProviderApplicationStatusAJAX = async () => {
	return await axiosWrapper<void, GetApplicationStatusDto>(
		providerApiRoutes.PROVIDER,
		{
			schema: getApplicationStatusResponseSchema,
		}
	);
};

const abortApplicationAJAX = async () => {
	return await axiosWrapper(providerApiRoutes.PROVIDER, {
		method: "delete",
	});
};

const getProviderProfileAJAX = async (providerId: string) => {
	return await axiosWrapper<void, GetProviderProfileDto>(
		`${providerApiRoutes.PROFILE}/${providerId}`,
		{
			schema: getProviderProfileSchema,
		}
	);
};

const editProviderProfileAJAX = async (form: EditProviderProfileForm) => {
	return await axiosWrapper<EditProviderProfileForm>(
		providerApiRoutes.PROFILE,
		{
			method: "put",
			data: form,
		}
	);
};
