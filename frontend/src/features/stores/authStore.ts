import { createStore } from "@udecode/zustood";
import { AuthorizeLevel } from "../../types/authModels";

type AuthState = {
	user: { id: string; username: string } | null;
	isAuthenticated: boolean | null;
	role: AuthorizeLevel;
};

const initAuthState: AuthState = Object.freeze({
	user: null,
	isAuthenticated: false,
	role: AuthorizeLevel.PUBLIC,
});

export const authStore = createStore("auth")<AuthState>(
	{
		...initAuthState,
	},
	{ middlewares: ["immer", "devtools", "persist"] }
)
	.extendActions((set) => ({
		setUser: (userId: string, username: string) => {
			set.user({ id: userId, username });
		},
	}))
	.extendActions((set) => ({
		reset: () => {
			set.user(null);
			set.isAuthenticated(false);
			set.role(AuthorizeLevel.PUBLIC);
		},
	}));
