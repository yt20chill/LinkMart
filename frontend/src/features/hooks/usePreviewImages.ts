import { useState } from "react";
import { toDataURLAsync } from "../../lib/utils";
import { allowedFileTypes } from "../forms/requestSchema/requestSchema";

type NewImages = { name: string; src: string };

// // TODO: move to parent
// const queryClient = useQueryClient();
// const a = useMutation({
// 	mutationFn: deleteRequestImageAJAX,
// 	onSuccess: async () => {
// 		// TODO: add toast
// 		await queryClient.invalidateQueries([queryKey.REQUEST, { Request }]);
// 	},
// });

export const usePreviewImages = () => {
	const [newImages, setNewImages] = useState<NewImages[]>([]);

	const onAppend = async (file: File | File[]) => {
		const files = Array.isArray(file) ? file : [file];
		const images = await Promise.all(
			files
				// filter out files that are not images or already exist in newImages
				.filter(
					(file) =>
						allowedFileTypes.includes(file.type) &&
						newImages.find((prevImage) => prevImage.name !== file.name)
				)
				.map(async (image) => ({
					name: image.name,
					src: await toDataURLAsync(image),
				}))
		);
		setNewImages((newImages) => [...newImages, ...images]);
	};
	const onDelete = (options: { name: string }) => {
		setNewImages(
			newImages.filter((newImage) => newImage.name !== options.name)
		);
	};

	return { onAppend, onDelete, newImages };
};
