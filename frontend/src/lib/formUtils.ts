import { ZodObject, ZodRawShape } from "zod";

export const appendFormData = <T extends object>(
	data: T,
	oldFormData?: FormData
): FormData => {
	console.log(data);
	const formData = oldFormData ?? new FormData();
	for (const key in data) {
		const value = data[key];
		if (formData.has(key) || value === undefined || value === null) continue;
		if (Array.isArray(value) || value instanceof FileList) {
			for (const elem of value) {
				formData.append(key, elem as string | Blob);
			}
		} else if (typeof value === "object")
			formData.append(key, JSON.stringify(value));
		else formData.append(key, value as string);
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

export const objectToJSON = (obj: object): string | null => {
	if (Object.keys(obj).length === 0) return null;
	return JSON.stringify(obj);
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
