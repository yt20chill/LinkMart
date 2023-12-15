import { ZodObject, ZodRawShape } from "zod";

export const appendFormData = <T extends object>(
	data: T,
	oldFormData?: FormData
): FormData => {
	const formData = oldFormData ?? new FormData();
	for (const key in data) {
		const value = data[key];
		if (formData.has(key)) continue;
		if (Array.isArray(value)) {
			value.forEach((elem) => {
				formData.append(key, elem as string);
			});
			continue;
		}
		formData.append(key, value as string);
	}
	return formData;
};

export const printFormData = (formData: FormData) => {
	for (const [k, v] of formData.entries()) {
		console.log(`${k}:`, v);
	}
};

export const removeFileFromArray = (files: File[], name: string) => {
	if (files.length <= 1) return [];
	return files.filter((file) => file.name !== name);
};

export const isFileExists = <T extends { name: string }>(
	files: T[],
	file: File
) => {
	return files.some((f) => f.name === file.name);
};

export const dtoToString = <T extends Record<string, unknown>>(
	dto: Record<keyof T, unknown>
) => {
	return Object.entries(dto).reduce((acc, [key, value]) => {
		if (typeof value === "object")
			acc[key as keyof T] = JSON.stringify(value) ?? "";
		else acc[key as keyof T] = value?.toString() ?? "";
		return acc;
	}, {} as Record<keyof T, string>);
};

export const emptyObjectToNull = <T extends Record<string, string>>(
	obj: T
): T | null => {
	if (Object.keys(obj).length === 0) return null;
	return obj;
};

export const arrayToFileList = (files: File[]) => {
	const dataTransfer = new DataTransfer();
	files.forEach((file) => dataTransfer.items.add(file));
	return dataTransfer.files;
};

/**
 *
 * @param formSchema Z object
 * @returns object of all keys set to empty string
 */
export const generateEmptyStringDefaultValues = <T extends ZodRawShape>(
	formSchema: ZodObject<T>
): Readonly<Record<keyof T, string>> => {
	return Object.freeze(
		Object.keys(formSchema.shape).reduce((acc: Record<string, string>, key) => {
			acc[key] = "";
			return acc;
		}, {}) as Readonly<Record<keyof T, string>>
	);
};
