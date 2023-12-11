import { useEffect, useState } from "react";
import {
	FieldPath,
	FieldValues,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { toDataURLAsync } from "../../lib/utils";

type Base64Image = { name: string; src: string };

export const usePreviewFormImages = <T extends FieldValues>(
	watch: UseFormWatch<T>,
	path: FieldPath<T>,
	setValue: UseFormSetValue<T>
) => {
	const imageFiles = watch(path) as FileList;
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
			.catch(() => toast.error("Something went wrong"));
	}, [imageArray]);
	const onDelete = (options: { name: string }) => {
		setBase64Images((base64Images) =>
			base64Images.filter((newImage) => newImage.name !== options.name)
		);
		setValue(
			path,
			imageArray.filter((file) => file.name !== options.name)
		);
	};

	return { base64Images, onDelete };
};
