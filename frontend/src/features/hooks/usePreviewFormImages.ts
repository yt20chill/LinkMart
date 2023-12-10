import { useEffect, useMemo, useState } from "react";
import {
	FieldPath,
	FieldValues,
	PathValue,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { isFileExists, removeFileFromArray } from "../../lib/formUtils";
import { toDataURLAsync } from "../../lib/utils";
import { allowedFileTypes } from "../forms/requestSchema/requestSchema";

type NewImage = { name: string; src: string };

export const usePreviewFormImages = <T extends FieldValues>(
	watch: UseFormWatch<T>,
	path: FieldPath<T>,
	setValue: UseFormSetValue<T>
) => {
	const imageFiles = watch(path) as File[];
	const [newImages, setNewImages] = useState<NewImage[]>([]);
	const [pendingImages, setPendingImages] = useState<File[]>([]);
	const memoizedImages = useMemo(() => newImages, [newImages]);
	// on change
	useEffect(() => {
		setPendingImages(() =>
			imageFiles.filter(
				(file) =>
					allowedFileTypes.includes(file.type) &&
					!isFileExists(memoizedImages, file)
			)
		);
		return () => setPendingImages([]);
	}, [imageFiles, memoizedImages]);

	useEffect(() => {
		if (pendingImages.length === 0) return;
		Promise.all(
			pendingImages.map(async (image) => ({
				name: image.name,
				src: await toDataURLAsync(image),
			}))
		)
			.then((images) => {
				setNewImages((prevImages) => [...prevImages, ...images]);
			})
			.catch(() => {
				toast.error("Something went wrong");
			});
	}, [pendingImages]);

	const onDelete = (options: { name: string }) => {
		setNewImages((newImages) =>
			newImages.filter((newImage) => newImage.name !== options.name)
		);

		setValue<typeof path>(
			path,
			removeFileFromArray(imageFiles, options.name) as PathValue<
				T,
				FieldPath<T>
			>
		);
	};

	return { newImages: memoizedImages, onDelete };
};
