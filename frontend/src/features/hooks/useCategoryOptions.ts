import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { queryKey } from "../../lib/apiUtils";
import { CategoryFieldDto } from "../../schemas/responseSchema";
import { getCategoryFieldsAJAX } from "../api/requestApi";

const mockDropDownFields = [{ size: ["XS", "S"] }, { color: ["Red", "Blue"] }];
const mockTextFields = ["Brand", "Material"];
export const useCategoryOptions = (categoryId: number) => {
	return {
		dropDownFields: mockDropDownFields,
		textFields: mockTextFields,
		defaultEmptyValues: { size: "", color: "", Brand: "", Material: "" },
	};
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
		const dropDownMap = categoryFields
			.filter((field) => field.categoryFieldOption.length > 0)
			.reduce((acc, field) => {
				acc.push({
					[field.categoryFieldName]: field.categoryFieldOption.map(
						(option) => option.categoryFieldOptionName
					),
				});
				return acc;
			}, [] as Array<Record<string, string[]>>);
		setDropDownFields(() => dropDownMap);
		setTextFields(() =>
			categoryFields
				.filter((field) => field.categoryFieldOption.length === 0)
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
