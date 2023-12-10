import { useEffect, useState } from "react";
import {
	FieldPath,
	FieldValues,
	PathValue,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { isFileExists, removeFileFromArray } from "../../lib/formUtils";
import { toDataURLAsync } from "../../lib/utils";
import { allowedFileTypes } from "../forms/requestSchema/requestSchema";

type NewImage = { name: string; src: string };

export const usePreviewFormImages = <T extends FieldValues>(
	watch: UseFormWatch<T>,
	path: FieldPath<T>,
	setValue: UseFormSetValue<T>
) => {
	const imageFiles = watch(path) as File[] | null;
	const [newImages, setNewImages] = useState<NewImage[]>([]);
	const [pendingImages, setPendingImages] = useState<File[]>([]);

	// on change
	useEffect(() => {
		if (!imageFiles) return;
		setPendingImages(
			imageFiles.filter(
				(file) =>
					allowedFileTypes.includes(file.type) && !isFileExists(newImages, file)
			)
		);

		return setPendingImages([]);
	}, [imageFiles, newImages]);

	useEffect(() => {
		if (pendingImages.length === 0) return;
		Promise.all(
			pendingImages.map(async (image) => ({
				name: image.name,
				src: await toDataURLAsync(image),
			}))
		)
			.then((images) =>
				setNewImages((prevImages) => [...prevImages, ...images])
			)
			.catch(() => {
				//TODO: add toast
			});
	}, [pendingImages]);

	const onDelete = (options: { name: string }) => {
		setNewImages(
			newImages.filter((newImage) => newImage.name !== options.name)
		);
		if (imageFiles)
			setValue(
				path,
				removeFileFromArray(imageFiles, options.name) as PathValue<
					T,
					FieldPath<T>
				>
			);
	};

	return { newImages, onDelete };
};
