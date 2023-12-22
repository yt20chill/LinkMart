import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { usePreviewFormImages } from "../../features/hooks/usePreviewFormImages";
import { camelToTitleCase } from "../../lib/utils";
import { allowedFileTypes } from "../../schemas/requestSchema";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";
import ImagePreview from "./ImagePreview";

type FormImageInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	accept?: string;
	multiple?: boolean;
	watch: UseFormWatch<T>;
	setValue: UseFormSetValue<T>;
};

function FormImageInput<T extends FieldValues>({
	name,
	register,
	label = camelToTitleCase(name),
	accept = allowedFileTypes.join(","),
	multiple = true,
	errors,
	watch,
	setValue,
}: FormImageInputProps<T>) {
	const error = errors?.[name]?.message as string | undefined;
	const { base64Images, onDelete } = usePreviewFormImages(
		watch,
		name,
		setValue
	);
	return (
		<>
			<label className="form-control w-full max-w-lg h-12 outline-slate-400 outline-2 outline-dashed rounded-btn my-6 py-16 bg-base-100/10 hover:bg-base-100/50 flex items-center justify-center cursor-pointer">
				<i className="bi bi-images text-slate-400 text-5xl"></i>
				<div className="text-slate-400">Upload Image</div>
				<div className="label hidden">
					<span className="label-text">{label}</span>
				</div>
				<input
					type="file"
					multiple={multiple}
					accept={accept}
					{...register(name)}
					className="file-input file-input-bordered w-full max-w-lg hidden"
				/>
				{error && <ErrorMessage message={error} />}
			</label>
			{base64Images.map((image) => (
				<ImagePreview key={image.name} {...image} onDelete={onDelete} />
			))}
		</>
	);
}

export default FormImageInput;
