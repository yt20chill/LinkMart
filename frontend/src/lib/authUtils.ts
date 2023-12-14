import { setCommonAuthorizationHeader } from "./apiUtils";

const signInHandler = (jwt: string): void => {
	window.localStorage.setItem("access_token", jwt);
	setCommonAuthorizationHeader();
};

const signOutHandler = (): void => {
	window.localStorage.removeItem("access_token");
	setCommonAuthorizationHeader(false);
};

export { signInHandler, signOutHandler };
