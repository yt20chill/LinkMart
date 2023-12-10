import { useMutation, useQuery, useQueryClient } from "react-query";
import ImagePreview from "../../components/ui/ImagePreview";
import { queryKey } from "../../lib/apiUtils";
import {
	deleteRequestImageAJAX,
	getRequestDetailsAJAX,
} from "../api/requestApi";
import { ImageDto, RequestDetailsDto } from "../api/responseSchema";
import { usePreviewFormImages } from "../hooks/usePreviewFormImages";

type EditRequestFormProps = {
	requestId: string;
};

const mockImage: ImageDto = {
	imageId: 1,
	imagePath:
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png",
};

function EditRequestForm({ requestId }: EditRequestFormProps) {
	const {
		data: requestDetails,
		isLoading,
		isError,
	} = useQuery<RequestDetailsDto>({
		queryKey: [queryKey.REQUEST, { requestId }],
		queryFn: () => getRequestDetailsAJAX({ requestId }),
	});
	const queryClient = useQueryClient();
	const { mutateAsync: deleteImage } = useMutation({
		mutationFn: deleteRequestImageAJAX,
		onSuccess: async () => {
			// TODO: add toast
			await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
		},
	});
	const { onAppend, onDelete, newImages } = usePreviewFormImages();
	return (
		<>
			{requestDetails}
			{isLoading && <div className="skeleton w-32 h-32"></div>}
			{newImages.length > 0 &&
				newImages.map((image) => (
					<ImagePreview key={image.name} {...image} onDelete={onDelete} />
				))}
		</>
	);
}

export default EditRequestForm;
