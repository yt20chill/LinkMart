import { create } from "zustand";
import { createSelectors } from "../../lib/utils";
import { AuthorizeLevel } from "../../types/authModels";

type AuthState = {
	userId: string | null;
	username: string | null;
	isAuthenticated: boolean | null;
	role: AuthorizeLevel;
};
type AuthAction = {
	setUser: (userId: string, username: string) => void;
	setIsAuthenticated: (status: boolean | null) => void;
	logout: () => void;
	reset: () => void;
};

const initAuthState: AuthState = {
	userId: null,
	username: null,
	isAuthenticated: false,
	role: AuthorizeLevel.PUBLIC,
};

const useAuthStoreBase = create<AuthState & AuthAction>()((set) => ({
	...initAuthState,
	setUser: (userId, username) => set({ userId, username }),
	setIsAuthenticated: (status) => set({ isAuthenticated: status }),
	logout: () => set({ isAuthenticated: false }),
	reset: () => set(initAuthState),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);

// usage example:
// get the property
// const username = useAuthStore.use.username()

// // get the action
// const setUser = useAuthStore.use.setUser()
