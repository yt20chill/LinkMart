import { FieldValues } from "react-hook-form";
import { BaseFormInputProps } from "../../lib/formUtils";
import { camelToTitleCase } from "../../lib/utils";
import ErrorMessage from "./ErrorMessage";

type FormSelectProps<T extends FieldValues> = BaseFormInputProps<T> & {
	optionItems: OptionItem[];
	required?: boolean;
};

type OptionItem = {
	value: string;
	displayValue?: string;
};

function FormSelect<T extends FieldValues>({
	name,
	label = camelToTitleCase(name),
	placeholder = `Select ${label}`,
	optionItems,
	defaultValue,
	required = true,
	register,
	errors,
}: FormSelectProps<T>) {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<label className="form-control w-full max-w-xs">
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<select
				className="select select-accent w-full max-w-xs"
				{...register(name)}
				defaultValue={defaultValue}
				required={required}
			>
				<option disabled value={undefined}>
					{placeholder}
				</option>
				{optionItems.map((item) => (
					<option key={item.value} value={item.value}>
						{item.displayValue ?? item.value}
					</option>
				))}
			</select>
			{error && <ErrorMessage message={error} />}
		</label>
	);
}

export default FormSelect;
