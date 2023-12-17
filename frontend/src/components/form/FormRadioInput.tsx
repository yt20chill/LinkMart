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
    <div className="space-y-8 flex flex-col">
      <p>{label}</p>
      {optionItems.map((item, index) => (
        <div key={item.value} className=" shadow-primary-200">
          <input
            type="radio"
            className="me-5"
            value={item.value}
            id={item.value}
            defaultChecked={index === 0}
            {...register(name)}
          />
          <label htmlFor={item.value}>{item.displayValue}</label>
        </div>
      ))}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormRadioInput;
