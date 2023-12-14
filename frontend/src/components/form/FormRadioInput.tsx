import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps, OptionItem } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormRadioInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	optionItems: OptionItem[];
};

const FormRadioInput = <T extends FieldValues>({
	name,
	label = camelToTitleCase(name),
	optionItems,
	register,
	errors,
}: FormRadioInputProps<T>) => {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<div className="rating space-y-8">
			<p>{label}</p>
			{optionItems.map((item, index) => (
				<div key={item.value}>
					<label htmlFor={item.value}>{item.displayValue}</label>
					<input
						type="radio"
						className="mask mask-star-2 bg-orange-400"
						value={item.value}
						id={item.value}
						defaultChecked={index === 0}
						{...register(name)}
					/>
				</div>
			))}
			{error && <ErrorMessage message={error} />}
		</div>
	);
};

export default FormRadioInput;
