import { fireAlert, sweetAlertDefaultOptions } from "../../lib/formUtils";
import { isObjOfType } from "../../lib/utils";

type BaseImagePreviewProps = {
  src: string;
  canDelete?: boolean;
};

type ExistingImagePreviewProps = BaseImagePreviewProps & {
  imageId: number;
  onDelete: (options: { imageId: number }) => Promise<void> | void;
};

type NewImagePreviewProps = BaseImagePreviewProps & {
  name: string;
  onDelete: (options: { name: string }) => void;
};

const sweetAlertOptions = {
  ...sweetAlertDefaultOptions,
  text: "Are you sure you want to delete this image?",
};

const ImagePreview = (
  props: ExistingImagePreviewProps | NewImagePreviewProps
) => {
  const onDelete = async () =>
    isObjOfType<ExistingImagePreviewProps>(props, "imageId")
      ? await props.onDelete({ imageId: props.imageId })
      : props.onDelete({ name: props.name });
  return (
    <div className="relative aspect-square bg-slate-300 rounded-sm [&_button]:hover:flex border border-slate-400 overflow-hidden">
      <img alt="" src={props.src} className="object-cover h-full" />
      {props.canDelete ||
        (props.canDelete === false ? null : (
          <button
            className="hidden absolute top-1 right-1 bg-slate-500 h-6 w-6 items-center justify-center rounded-full hover:bg-rose-400 hover:shadow-lg hover:ring-2 ring-white transition-all"
            onClick={fireAlert({
              onConfirmed: onDelete,
              options: sweetAlertOptions,
            })}
          >
            <i className="bi bi-x text-white text-lg"></i>
          </button>
        ))}
    </div>
  );
};

export default ImagePreview;
