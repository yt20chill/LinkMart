import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import {
	EditProviderProfileForm,
	TApplyProviderForm,
} from "../../schemas/requestSchema";
import {
	GetApplicationStatusDto,
	GetProviderProfileDto,
	ProviderDashboardDto,
	getApplicationStatusResponseSchema,
	getProviderDashboardSchema,
	getProviderProfileSchema,
} from "../../schemas/responseSchema";

export {
	abortApplicationAJAX,
	applyProviderAJAX,
	editProviderProfileAJAX,
	getProviderApplicationStatusAJAX,
	getProviderDashboardAJAX,
	getProviderProfileAJAX,
};

const providerApiRoutes = {
	PROVIDER: "/api/provider",
	PROFILE: "/api/provider/profile",
	PUBLIC_PROFILE: "/provider/profile",
	DASHBOARD: "/api/provider/dashboard",
};

const applyProviderAJAX = async (form: TApplyProviderForm) => {
	return await axiosWrapper<FormData>(providerApiRoutes.PROVIDER, {
		method: "post",
		data: appendFormData(form),
	});
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

async function getProviderProfileAJAX(
	providerId?: string
): Promise<GetProviderProfileDto | undefined> {
	if (providerId)
		return await axiosWrapper<void, GetProviderProfileDto>(
			`${providerApiRoutes.PUBLIC_PROFILE}/${providerId}`,
			{ schema: getProviderProfileSchema }
		);
	return await axiosWrapper<void, GetProviderProfileDto>(
		providerApiRoutes.PROFILE,
		{
			schema: getProviderProfileSchema,
		}
	);
}

const editProviderProfileAJAX = async (form: EditProviderProfileForm) => {
	return await axiosWrapper<EditProviderProfileForm>(
		providerApiRoutes.PROFILE,
		{
			method: "put",
			data: form,
		}
	);
};

const getProviderDashboardAJAX = async () => {
	return await axiosWrapper<void, ProviderDashboardDto>(
		providerApiRoutes.DASHBOARD,
		{
			schema: getProviderDashboardSchema,
		}
	);
};
