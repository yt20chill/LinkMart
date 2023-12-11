import {
	FieldErrors,
	FieldPath,
	FieldValues,
	UseFormRegister,
} from "react-hook-form";

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

export type BaseFormInputProps<T extends FieldValues = FieldValues> = {
	name: FieldPath<T>;
	register: UseFormRegister<T>;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
	errors: FieldErrors<T>;
};

export const dtoToString = <T extends Record<string, unknown>>(
	dto: Record<keyof T, unknown>
) => {
	return Object.entries(dto).reduce((acc, [key, value]) => {
		acc[key as keyof T] = value?.toString() ?? "";
		return acc;
	}, {} as Record<keyof T, string>);
};
