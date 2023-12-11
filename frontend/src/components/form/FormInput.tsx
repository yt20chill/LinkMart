import { FieldValues } from "react-hook-form";
import { BaseFormInputProps } from "../../lib/formUtils";
import { camelToTitleCase } from "../../lib/utils";
import { FormInputType } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	type?: FormInputType;
};

function FormInput<T extends FieldValues>({
	name,
	label = camelToTitleCase(name),
	placeholder = label,
	type = "text",
	defaultValue = "",
	register,
	errors,
}: FormInputProps<T>) {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<label className="form-control w-full max-w-xs">
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<input
				type={type}
				placeholder={placeholder}
				className="input input-bordered w-full max-w-xs"
				defaultValue={defaultValue}
				{...register(name)}
			/>
			{error && <ErrorMessage message={error} />}
		</label>
	);
}

export default FormInput;
