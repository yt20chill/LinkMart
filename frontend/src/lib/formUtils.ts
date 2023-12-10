export const appendFormData = <T extends object>(data: T): FormData => {
	const formData = new FormData();
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
	if (files.length <= 1) return null;
	return files.filter((file) => file.name !== name);
};

export const isFileExists = <T extends { name: string }>(
	files: T[],
	file: File
) => {
	return files.some((f) => f.name === file.name);
};
