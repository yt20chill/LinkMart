import { createContext, useContext } from "react";
import { UseSearchParamsWrapperReturnType } from "../../features/hooks/useSearchParamsWrapper";

export const SearchParamsWrapperContext = createContext<
	UseSearchParamsWrapperReturnType | undefined
>(undefined);

export const useSearchParamsContext = () => {
	const searchParamsWrapper = useContext(SearchParamsWrapperContext);
	if (!searchParamsWrapper) {
		throw new Error(
			"useSearchParamsContext must be used within a SearchParamsWrapperContext Provider"
		);
	}
	return searchParamsWrapper;
};
