import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormTextAreaInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	disabled?: boolean;
};

const FormTextAreaInput = <T extends FieldValues>({
	name,
	label = camelToTitleCase(name),
	placeholder = label,
	defaultValue,
	register,
	errors,
	disabled = false,
}: FormTextAreaInputProps<T>) => {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<>
			<label className="form-control w-full max-w-lg">
				<div className="label py-1">
					<span className="label-text">{label}</span>
				</div>
				<textarea
					placeholder={placeholder}
					className="input input-bordered w-full max-w-lg p-4 h-auto"
					rows={3}
					defaultValue={defaultValue}
					disabled={disabled}
					{...register(name)}
				></textarea>
			</label>
			{error && <ErrorMessage message={error} />}
		</>
	);
};

export default FormTextAreaInput;
