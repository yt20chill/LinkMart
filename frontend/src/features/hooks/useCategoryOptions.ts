import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CategoryFieldDto } from "../../schemas/responseSchema";
import { getCategoryFieldsAJAX } from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";

export const useCategoryOptions = (categoryId: number) => {
	if (!categoryId || isNaN(categoryId))
		throw new Error("categoryId is invalid");
	const { data: categoryFields } = useQuery<CategoryFieldDto[]>({
		queryKey: [queryKey.REQUEST, { categoryId }],
		queryFn: () => getCategoryFieldsAJAX({ categoryId }),
		cacheTime: Infinity,
	});
	const [dropDownFields, setDropDownFields] = useState<
		Array<Record<string, string[]>>
	>([]);
	const [textFields, setTextFields] = useState<Array<string>>([]);
	const [defaultEmptyValues, setDefaultEmptyValues] = useState<
		Record<string, string>
	>({});

	useEffect(() => {
		if (!categoryFields) return;
		const dropDownMap: Record<string, string[]>[] = categoryFields
			.filter((field) => field.categoryFieldOptions.length > 0)
			.reduce((acc, field) => {
				acc.push({
					[field.categoryFieldName]: field.categoryFieldOptions,
				});
				return acc;
			}, [] as Array<Record<string, string[]>>);
		setDropDownFields(() => dropDownMap);
		setTextFields(() =>
			categoryFields
				.filter((field) => field.categoryFieldOptions.length === 0)
				.map((field) => field.categoryFieldName)
		);
		setDefaultEmptyValues(
			categoryFields
				.map((field) => field.categoryFieldName)
				.reduce((acc, fieldName) => {
					acc[fieldName] = "";
					return acc;
				}, {} as Record<string, string>)
		);
	}, [categoryFields]);
	return { dropDownFields, textFields, defaultEmptyValues };
};
