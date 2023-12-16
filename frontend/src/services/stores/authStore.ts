import { create } from "zustand";
import { createSelectors } from "../../lib/utils";
import { AuthorizeLevel } from "../../types/authModels";

export type AuthState = {
	username: string | null;
	isAuthenticated: boolean | null;
	role: AuthorizeLevel;
};

type AuthActions = {
	login: (username: string | null, role: AuthorizeLevel) => void;
	reset: () => void;
	setIsAuthenticated: (isAuthenticated: boolean | null) => void;
};

const initAuthState: AuthState = Object.freeze({
	username: null,
	isAuthenticated: false,
	role: AuthorizeLevel.PUBLIC,
});

const useAuthStoreBase = create<AuthState & AuthActions>()((set) => ({
	...initAuthState,
	login: (username: string | null, role: AuthorizeLevel) =>
		set({ username, role, isAuthenticated: role > AuthorizeLevel.PUBLIC }),
	reset: () => set(initAuthState),
	setIsAuthenticated: (isAuthenticated: boolean | null) =>
		set({ isAuthenticated }),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
