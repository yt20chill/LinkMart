import { UseSearchParamsWrapperReturnType } from "../features/hooks/useSearchParamsWrapper";

export type FilterKeyProps = FilterItem & {
	searchParamsWrapper: UseSearchParamsWrapperReturnType;
};

export type FilterItem = {
	name: string;
	value: string;
};
