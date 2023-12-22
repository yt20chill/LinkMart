import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import { TApplyProviderForm } from "../../schemas/requestSchema";
import {
	ApplyProviderDto,
	GetApplicationStatusDto,
	getApplicationStatusResponseSchema,
	postProviderDtoSchema,
} from "../../schemas/responseSchema";

export {
	abortApplicationAJAX,
	applyProviderAJAX,
	getProviderApplicationStatusAJAX,
};

const providerApiRoutes = {
	PROVIDER: "/api/provider",
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
