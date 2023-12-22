import { axiosWrapper } from "../../lib/apiUtils";
import { appendFormData } from "../../lib/formUtils";
import { TApplyProviderForm } from "../../schemas/requestSchema";
import {
	ApplyProviderDto,
	postProviderDtoSchema,
} from "../../schemas/responseSchema";

export { applyProviderAJAX };

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
