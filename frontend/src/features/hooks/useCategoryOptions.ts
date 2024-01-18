import { useQuery } from "react-query";
import { CategoryFieldDto } from "../../schemas/responseSchema";
import { getCategoryFieldsAJAX } from "../../services/api/requestApi";
import { queryKey } from "../../services/query.config";
import { useAuthStore } from "@/services/stores/authStore";

export const useCategoryOptions = (categoryId: number) => {
	if (!categoryId || isNaN(categoryId)){
		throw new Error("categoryId is invalid");
	}

	// 1. UseQuery fetch Data
	const { data: categoryFields } = useQuery<CategoryFieldDto[]>({
		queryKey: [queryKey.REQUEST, { categoryId }],
		queryFn: () => getCategoryFieldsAJAX({ categoryId }),
		cacheTime: Infinity,
	});

	// 2. Without Data case
	if(!categoryFields){
		return {
			dropDownFields:[], 
			textFields:[], 
			defaultEmptyValues:{} 
		}
	}

	// 3. With Data case
	const dropDownMap: Record<string, string[]>[] = categoryFields
			.filter((field) => field.categoryFieldOptions.length > 0)
			.reduce((acc, field) => {
				acc.push({
					[field.categoryFieldName]: field.categoryFieldOptions,
				});
				return acc;
			}, [] as Array<Record<string, string[]>>);
	return {
		dropDownFields:  dropDownMap,
		textFields : categoryFields
			.filter((field) => field.categoryFieldOptions.length === 0)
			.map((field) => field.categoryFieldName),
		defaultEmptyValues:categoryFields
			.map((field) => field.categoryFieldName)
			.reduce((acc, fieldName) => {
				acc[fieldName] = "";
				return acc;
			}, {} as Record<string, string>)
	}
	
};
