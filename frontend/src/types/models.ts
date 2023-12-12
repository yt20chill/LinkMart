declare global {
	namespace Axios {
		interface AxiosError {
			response?: {
				data?: {
					message?: string;
				};
			};
		}
	}
}
