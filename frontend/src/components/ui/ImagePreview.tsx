import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isObjOfType } from "../../lib/utils";

type BaseImagePreviewProps = {
	src: string;
};

type ExistingImagePreviewProps = BaseImagePreviewProps & {
	imageId: number;
	onDelete: (options: { imageId: number }) => void;
};

type NewImagePreviewProps = BaseImagePreviewProps & {
	name: string;
	onDelete: (options: { name: string }) => void;
};

const ImagePreview = (
	props: ExistingImagePreviewProps | NewImagePreviewProps
) => {
	const showAlert = () => {
		withReactContent(SweetAlert)
			.fire({
				titleText: "Confirm Delete?",
				text: "Are you sure you want to delete this image?",
				icon: "warning",
				showCancelButton: true,
			})
			.then((result) => {
				if (!result.isConfirmed) return;
				if (isObjOfType<ExistingImagePreviewProps>(props, "imageId"))
					props.onDelete({ imageId: props.imageId });
				else props.onDelete({ name: props.name });
			})
			.catch(() => alert("something went wrong")); //TODO: add toast
	};

	return (
		<div className="relative w-64 h-64">
			<img alt="" src={props.src} className="w-full h-auto" />
			<button
				className="btn btn-circle absolute top-0 right-0 m-2"
				onClick={showAlert}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ImagePreview;
