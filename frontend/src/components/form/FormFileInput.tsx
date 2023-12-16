import { FieldValues, UseFormSetValue } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { allowedFileTypes } from "../../schemas/requestSchema";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormFileInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	accept?: string;
	multiple?: boolean;
	setValue: UseFormSetValue<T>;
};

function FormFileInput<T extends FieldValues>({
	name,
	register,
	label = camelToTitleCase(name),
	accept = allowedFileTypes.join(","),
	multiple = true,
	errors,
}: FormFileInputProps<T>) {
	const error = errors?.[name]?.message as string | undefined;

	return (
		<label className="form-control w-full max-w-xs">
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<input
				type="file"
				multiple={multiple}
				accept={accept}
				{...register(name)}
				className="file-input file-input-bordered w-full max-w-xs"
			/>
			{error && <ErrorMessage message={error} />}
		</label>
	);
}

export default FormFileInput;
