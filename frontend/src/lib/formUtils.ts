import { toast } from "react-toastify";
import SweetAlert, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ZodEffects, ZodObject, ZodRawShape } from "zod";
import { isObjOfType } from "./utils";

export {
	appendFormData,
	arrayToFileList,
	dtoToString,
	fireAlert,
	generateDefaultValues,
	isFileExists,
	maskHalfClassNameArr,
	objectToJSON,
	printFormData,
	removeFileFromArray,
	sweetAlertDefaultOptions,
};
const appendFormData = <T extends object>(
	data: T,
	oldFormData?: FormData
): FormData => {
	const formData = oldFormData ?? new FormData();
	for (const key in data) {
		const value = data[key];
		if (
			formData.has(key) ||
			value === undefined ||
			value === null ||
			(typeof value === "object" && Object.keys(value).length === 0)
		)
			continue;
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
		if (value instanceof Object)
			acc[key as keyof T] = JSON.stringify(value) ?? "";
		else acc[key as keyof T] = value ? value.toString() : "";
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

function generateDefaultValues<
	T extends ZodRawShape,
	K extends keyof T = never
>(
	formSchema: ZodObject<T>,
	options?: { exclude?: K[] }
): Readonly<Record<Exclude<keyof T, K>, string>>;
function generateDefaultValues<
	T extends ZodRawShape,
	K extends keyof T = never
>(
	formSchema: ZodEffects<ZodObject<T>>,
	options?: { exclude?: K[] }
): Readonly<Record<Exclude<keyof T, K>, string>>;
/**
 *
 * @param formSchema Z object
 * @returns object of all keys set to empty string
 */
function generateDefaultValues<
	T extends ZodRawShape,
	K extends keyof T = never
>(
	formSchema: ZodObject<T> | ZodEffects<ZodObject<T>>,
	options?: { exclude?: K[] }
): Readonly<Record<Exclude<keyof T, K>, string>> {
	const keys = isObjOfType<ZodObject<T>>(formSchema, "shape")
		? Object.keys(formSchema.shape)
		: Object.keys(formSchema._def.schema.shape);
	return Object.freeze(
		keys.reduce((acc: Record<string, string>, key) => {
			if (options?.exclude?.includes(key as K)) return acc;
			acc[key] = "";
			return acc;
		}, {}) as Record<Exclude<keyof T, K>, string>
	);
}
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

const maskHalfClassNameArr = Object.freeze(["mask-half-1", "mask-half-2"]);

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
