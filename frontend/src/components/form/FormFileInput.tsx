import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormFileInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	accept?: string;
	multiple?: boolean;
	description?: string;
};

function FormFileInput<T extends FieldValues>({
	name,
	register,
	label = camelToTitleCase(name),
	accept = "*",
	multiple = true,
	errors,
	description,
}: FormFileInputProps<T>) {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<div>
			<div className="label mt-2">
				<span className="label-text">{label}</span>
				{description && <p className="text-slate-400 text-sm">{description}</p>}
			</div>
			<label
				htmlFor={name}
				className="form-control w-full max-w-lg h-12 outline-slate-400 outline-2 outline-dashed rounded-btn mb-2 py-16 bg-base-100/10 hover:bg-base-100/50 flex items-center justify-center cursor-pointer"
			>
				<i className="bi bi-file-earmark-arrow-up text-slate-400 text-5xl"></i>
				<div className="text-slate-400">Upload File</div>
			</label>
			<input
				id={name}
				type="file"
				multiple={multiple}
				accept={accept}
				{...register(name)}
				className="file:me-3 w-full text-sm bg-base-100 border border-slate-500/20 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:bg-base-200 file:hover:bg-base-100 file:text-slate-500 rounded"
			/>
			{error && <ErrorMessage message={error} />}
		</div>
	);
}

export default FormFileInput;
