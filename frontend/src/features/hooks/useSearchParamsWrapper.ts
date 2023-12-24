import { useMemo } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { ignoreCaseAndPlural } from "../../lib/formattingUtils";

export type UseSearchParamsWrapper = ([searchParams, setSearchParams]: [
	URLSearchParams,
	SetURLSearchParams
]) => UseSearchParamsWrapperReturnType;

export type UseSearchParamsWrapperReturnType = {
	searchParams: URLSearchParams;
	setSearchParams: SetURLSearchParams;
	toggleSearchParams: (name: string, value: string) => void;
	hasSearchParams: (name: string, value: string) => boolean;
};

export const useSearchParamsWrapper = ([searchParams, setSearchParams]: [
	URLSearchParams,
	SetURLSearchParams
]) => {
	return useMemo(() => {
		const toggleSearchParams = (name: string, value: string) => {
			if (!hasSearchParams(name, value)) {
				searchParams.append(name, value);
			} else {
				const values = searchParams.getAll(name);
				searchParams.delete(name);
				values
					.filter((v) => v !== value)
					.forEach((v) => searchParams.append(name, v));
				setSearchParams(searchParams);
			}
			searchParams.delete("p");
			return setSearchParams(searchParams);
		};

		const hasSearchParams = (name: string, value: string): boolean => {
			const values = searchParams.getAll(name);
			return (
				values.includes(value) ||
				ignoreCaseAndPlural(value, values) !== undefined
			);
		};

		return {
			searchParams,
			setSearchParams,
			toggleSearchParams,
			hasSearchParams,
		};
	}, [searchParams, setSearchParams]);
};
