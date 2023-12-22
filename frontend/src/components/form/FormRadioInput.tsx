import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps, OptionItem } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";
import { twMerge } from "tailwind-merge";

type FormRadioInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
  optionItems: OptionItem[];
  className?: string;
};

const FormRadioInput = <T extends FieldValues>({
  name,
  label = camelToTitleCase(name),
  optionItems,
  register,
  errors,
  className,
}: FormRadioInputProps<T>) => {
  const error = errors?.[name]?.message as string | undefined;
  return (
    <div className="flex flex-col">
      <div className="text-sm text-gray-400 pointer-events-auto select-auto indent-3">
        {label}
      </div>
      <div
        className={twMerge(
          "flex flex-col gap-2 overflow-y-auto p-2 pb-12",
          className ?? ""
        )}
      >
        {optionItems.map((item, index) => (
          <label key={item.value} className="cursor-pointer">
            <input
              type="radio"
              className="hidden [&+span]:checked:text-primary-400 [&+span]:checked:bg-base-100 [&+span]:checked:ring-2 [&+span]:checked:ring-offset-2"
              value={item.value}
              defaultChecked={index === 0}
              {...register(name)}
            />
            <span className="flex flex-col w-full border-2 rounded-lg p-4 shadow-primary-200 text-gray-400 bg-base-200 ring-primary-400/50">
              <span className="text-gray-400 text-xs">Address {index + 1}</span>
              {item.displayValue}
            </span>
          </label>
        ))}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default FormRadioInput;
