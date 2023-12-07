import axios from "axios";

export const queryKey = Object.freeze({
	REQUEST: "request",
	OFFER: "offer",
	ORDER: "order",
});

axios.defaults.baseURL = process.env.VITE_API_URL;

export const authApiRoutes = Object.freeze({
	SIGN_IN: `/api/user/login`,
	SIGN_UP: `/api/user/registration`,
});

export class FetchError extends Error {
	constructor(public readonly message: string = "Fetch Error") {
		super(message);
		Object.setPrototypeOf(this, FetchError.prototype);
	}
}
