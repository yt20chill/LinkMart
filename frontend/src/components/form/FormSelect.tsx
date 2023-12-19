import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps, OptionItem } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormSelectProps<T extends FieldValues> = BaseFormInputProps<T> & {
  optionItems: OptionItem[];
  required?: boolean;
};

const FormSelect = <T extends FieldValues>({
  name,
  label = camelToTitleCase(name),
  placeholder = `Select ${label}`,
  optionItems,
  defaultValue,
  required = true,
  register,
  errors,
}: FormSelectProps<T>) => {
  const error = errors?.[name]?.message as string | undefined;
  return (
    <label className="form-control w-full max-w-lg">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered w-full max-w-lg"
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
};

export default FormSelect;
