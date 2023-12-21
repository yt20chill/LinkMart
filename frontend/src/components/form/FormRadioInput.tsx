import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps, OptionItem } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";

type FormRadioInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
  optionItems: OptionItem[];
  onClick: () => void;
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
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-400 pointer-events-auto select-auto">
        {label}
      </div>
      {optionItems.map((item, index) => (
        <label
          key={item.value}
          className="border-2 rounded-lg p-4 shadow-primary-200 bg-base-200 cursor-pointer select-auto"
        >
          <input
            type="radio"
            className="me-5 [&~label]:checked:text-primary-400"
            value={item.value}
            defaultChecked={index === 0}
            {...register(name)}
          />
          <span>{item.displayValue}</span>
        </label>
      ))}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormRadioInput;
