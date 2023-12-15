import { useEffect, useState } from "react";
import {
	FieldValues,
	Path,
	PathValue,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { arrayToFileList } from "../../lib/formUtils";
import { isObjOfType, toDataURLAsync } from "../../lib/utils";

type Base64Image = { name: string; src: string };

type UsePreviewImagesReturnType = {
	base64Images: Base64Image[];
	onDelete: (options: { name: string }) => void;
};

export const usePreviewFormImages = <T extends FieldValues>(
	watch: UseFormWatch<T>,
	path: Path<T>,
	setValue: UseFormSetValue<T>
): UsePreviewImagesReturnType => {
	const imageFiles = watch(path);
	const [base64Images, setBase64Images] = useState<Base64Image[]>([]);
	const onDelete = (options: { name: string }) => {
		setBase64Images((base64Images) =>
			base64Images.filter((newImage) => newImage.name !== options.name)
		);
		setValue(
			path,
			arrayToFileList(
				Array.from(imageFiles as FileList).filter(
					(image) => image.name !== options.name
				)
			) as PathValue<T, Path<T>>
		);
	};
	useEffect(() => {
		if (
			!imageFiles ||
			Object.keys(imageFiles).length === 0 ||
			!isObjOfType<FileList>(imageFiles, "item")
		)
			return;
		Promise.all(
			Array.from(imageFiles as FileList).map(async (image) => {
				const dataUrl = await toDataURLAsync(image);
				return { name: image.name, src: dataUrl };
			})
		)
			.then((base64Images) => setBase64Images(base64Images))
			.catch(() => toast.error("Something went wrong"));
	}, [imageFiles]);

	return { base64Images, onDelete };
};
