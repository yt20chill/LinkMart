import { FieldValues, UseFormSetValue } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { allowedFileTypes } from "../../schemas/requestSchema";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type FormFileInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
  accept?: string;
  multiple?: boolean;
  setValue: UseFormSetValue<T>;
};

function FormFileInput<T extends FieldValues>({
  name,
  register,
  label = camelToTitleCase(name),
  accept = allowedFileTypes.join(","),
  multiple = true,
  errors,
}: FormFileInputProps<T>) {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <label className="form-control w-full max-w-lg h-12 outline-slate-400 outline-2 outline-dashed rounded-btn my-6 py-16 bg-base-100/10 hover:bg-base-100/50 flex items-center justify-center cursor-pointer">
      <i className="bi bi-images text-slate-400 text-5xl"></i>
      <div className="text-slate-400">Upload Image</div>
      <div className="label hidden">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        {...register(name)}
        className="file-input file-input-bordered w-full max-w-lg hidden"
      />
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default FormFileInput;
