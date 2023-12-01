import { mapValuesKey } from "@udecode/zustood";
import { authStore } from "./authStore";

export const rootStore = {
	auth: authStore,
};
// subscribe to changes, rerender when changes occur (reference compare)
export const useStore = () => mapValuesKey("use", rootStore);
// subscribe to changes, rerender only when value changes (shallow compare)
export const useTrackedStore = () => mapValuesKey("useTracked", rootStore);
export const store = mapValuesKey("get", rootStore);
export const actions = mapValuesKey("set", rootStore);

// Global hook selectors (subscribe to changes)
// useStore().storeName.property or useTrackedStore().storeName.property
// e.g. useStore().auth.user

// Global getter
// store.storeName.property()
// e.g. store.auth.user()

// Global actions (custom and setter)
// actions.storeName.property(args) or actions.storeName.customAction(args)
// actions.auth.isAuthenticated(null)
