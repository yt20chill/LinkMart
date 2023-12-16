import { create } from "zustand";
import { createSelectors } from "../../lib/utils";
import { AuthorizeLevels } from "../../types/authModels";

export type AuthState = {
	username: string | null;
	isAuthenticated: boolean | null;
	role: AuthorizeLevels;
};

type AuthActions = {
	login: (username: string | null, role: AuthorizeLevels) => void;
	reset: () => void;
	setIsAuthenticated: (isAuthenticated: boolean | null) => void;
};

const initAuthState: AuthState = Object.freeze({
	username: null,
	isAuthenticated: false,
	role: AuthorizeLevels.PUBLIC,
});

const useAuthStoreBase = create<AuthState & AuthActions>()((set) => ({
	...initAuthState,
	login: (username: string | null, role: AuthorizeLevels) =>
		set({ username, role, isAuthenticated: role > AuthorizeLevels.PUBLIC }),
	reset: () => set(initAuthState),
	setIsAuthenticated: (isAuthenticated: boolean | null) =>
		set({ isAuthenticated }),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
