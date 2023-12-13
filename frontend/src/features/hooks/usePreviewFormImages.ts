import { useEffect, useState } from "react";
import {
	FieldValues,
	Path,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { FetchError } from "../../lib/apiUtils";
import { arrayToFileList } from "../../lib/formUtils";
import { toDataURLAsync } from "../../lib/utils";

type Base64Image = { name: string; src: string };

type UsePreviewImagesReturnType = {
	base64Images: Base64Image[];
	onDelete: (options: { name: string }) => void;
};

export const usePreviewFormImages = <T extends FieldValues, K extends Path<T>>(
	watch: UseFormWatch<T>,
	path: K,
	setValue: UseFormSetValue<T>
): Path<T> extends FileList ? UsePreviewImagesReturnType : never => {
	const imageFiles = watch(path);
	if (
		Object.keys(imageFiles).length > 0 &&
		!((imageFiles as unknown) instanceof FileList)
	) {
		throw new FetchError(400, `The value at path "${path}" is not a FileList.`);
	}
	const [imageArray, setImageArray] = useState<File[]>([]);
	const [base64Images, setBase64Images] = useState<Base64Image[]>([]);
	useEffect(() => {
		setImageArray(() => Array.from(imageFiles));
	}, [imageFiles]);
	// on change
	// FIXME: bug, cannot delete image
	// useEffect(() => {
	// 	if (imageArray.length === memoizedImages.length) return;
	// 	setPendingImages(() =>
	// 		imageArray.filter(
	// 			(file) =>
	// 				allowedFileTypes.includes(file.type) &&
	// 				!isFileExists(memoizedImages, file)
	// 		)
	// 	);
	// 	return () => setPendingImages([]);
	// }, [imageArray, memoizedImages]);

	// useEffect(() => {
	// 	if (pendingImages.length === 0) return;
	// 	Promise.all(
	// 		pendingImages.map(async (image) => ({
	// 			name: image.name,
	// 			src: await toDataURLAsync(image),
	// 		}))
	// 	)
	// 		.then((images) => {
	// 			setNewImages((prevImages) => [...prevImages, ...images]);
	// 		})
	// 		.catch(() => {
	// 			toast.error("Something went wrong");
	// 		});
	// }, [pendingImages]);
	useEffect(() => {
		if (imageArray.length === 0) {
			setBase64Images([]);
			return;
		}
		Promise.all(
			imageArray.map(async (image) => {
				const dataUrl = await toDataURLAsync(image);
				return { name: image.name, src: dataUrl };
			})
		)
			.then((images) => setBase64Images(() => images))
			.catch(() => toast.error("Cannot read files"));
	}, [imageArray]);
	const onDelete = (options: { name: string }) => {
		setBase64Images((base64Images) =>
			base64Images.filter((newImage) => newImage.name !== options.name)
		);
		setValue<FileList>(
			path,
			arrayToFileList(imageArray.filter((image) => image.name !== options.name))
		);
	};

	return { base64Images, onDelete };
};
