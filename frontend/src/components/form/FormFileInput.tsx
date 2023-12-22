import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormFileInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	accept?: string;
	multiple?: boolean;
};

function FormFileInput<T extends FieldValues>({
	name,
	register,
	label = camelToTitleCase(name),
	accept = "*",
	multiple = true,
	errors,
}: FormFileInputProps<T>) {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<>
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<label
				htmlFor={name}
				className="form-control w-full max-w-lg h-12 outline-slate-400 outline-2 outline-dashed rounded-btn my-6 py-16 bg-base-100/10 hover:bg-base-100/50 flex items-center justify-center cursor-pointer"
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
				className="file-input file-input-bordered w-full max-w-lg"
			/>
			{error && <ErrorMessage message={error} />}
		</>
	);
}

export default FormFileInput;
