import { create } from "zustand";
import { createSelectors } from "../../lib/utils";
import { AuthorizeLevel } from "../../types/authModels";

type AuthState = {
	username: string | null;
	isAuthenticated: boolean | null;
	role: AuthorizeLevel;
};

type AuthActions = {
	login: (username: string, role: AuthorizeLevel) => void;
	reset: () => void;
};

const initAuthState: AuthState = Object.freeze({
	username: null,
	isAuthenticated: false,
	role: AuthorizeLevel.PUBLIC,
});

const useAuthStoreBase = create<AuthState & AuthActions>()((set) => ({
	...initAuthState,
	login: (username: string, role: AuthorizeLevel) =>
		set({ username, isAuthenticated: true, role }),
	reset: () => set(initAuthState),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
