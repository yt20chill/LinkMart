import { toast } from "react-toastify";
import SweetAlert, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ZodObject, ZodRawShape } from "zod";

const appendFormData = <T extends object>(
	data: T,
	oldFormData?: FormData
): FormData => {
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

const printFormData = (formData: FormData) => {
	for (const [k, v] of formData.entries()) {
		console.log(`${k}:`, v);
	}
};

const removeFileFromArray = (files: File[], name: string) => {
	if (files.length <= 1) return [];
	return files.filter((file) => file.name !== name);
};

const isFileExists = <T extends { name: string }>(files: T[], file: File) => {
	return files.some((f) => f.name === file.name);
};

const dtoToString = <T extends Record<string, unknown>>(
	dto: Record<keyof T, unknown>
) => {
	return Object.entries(dto).reduce((acc, [key, value]) => {
		if (typeof value === "object")
			acc[key as keyof T] = JSON.stringify(value) ?? "";
		else acc[key as keyof T] = value?.toString() ?? "";
		return acc;
	}, {} as Record<keyof T, string>);
};

const objectToJSON = (obj: object): string | null => {
	if (Object.keys(obj).length === 0) return null;
	return JSON.stringify(obj);
};

const arrayToFileList = (files: File[]) => {
	const dataTransfer = new DataTransfer();
	files.forEach((file) => dataTransfer.items.add(file));
	return dataTransfer.files;
};

/**
 *
 * @param formSchema Z object
 * @returns object of all keys set to empty string
 */
const generateEmptyStringDefaultValues = <
	T extends ZodRawShape,
	K extends keyof T = never
>(
	formSchema: ZodObject<T>,
	options?: { exclude?: K[] }
): Readonly<Record<Exclude<keyof T, K>, string>> => {
	return Object.freeze(
		Object.keys(formSchema.shape).reduce((acc: Record<string, string>, key) => {
			if (options?.exclude?.includes(key as K)) return acc;
			acc[key] = "";
			return acc;
		}, {}) as Record<Exclude<keyof T, K>, string>
	);
};
type OnClickCallback = () => Promise<void> | void;

type FireAlertParams = {
	options?: SweetAlertOptions;
	onConfirmed: OnClickCallback;
	onCancelled?: OnClickCallback;
};

const sweetAlertDefaultOptions: SweetAlertOptions = {
	titleText: "Confirm Delete?",
	text: "Are you sure you want to delete this?",
	icon: "warning",
	showCancelButton: true,
};

const fireAlert =
	({
		options = sweetAlertDefaultOptions,
		onConfirmed,
		onCancelled,
	}: FireAlertParams) =>
	async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		try {
			e.preventDefault();
			const option = await withReactContent(SweetAlert).fire(options);
			if (!option.isConfirmed)
				return onCancelled ? await onCancelled() : undefined;
			return await onConfirmed();
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

export {
	appendFormData,
	arrayToFileList,
	dtoToString,
	fireAlert,
	generateEmptyStringDefaultValues,
	isFileExists,
	objectToJSON,
	printFormData,
	removeFileFromArray,
	sweetAlertDefaultOptions,
};
