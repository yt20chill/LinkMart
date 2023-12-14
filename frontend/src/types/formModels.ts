import {
	FieldErrors,
	FieldPath,
	FieldValues,
	UseFormRegister,
} from "react-hook-form";

export type FormInputType = "text" | "email" | "password" | "number" | "radio";

export type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

export type FormItemContextValue = {
	id: string;
};

export type BaseFormInputProps<T extends FieldValues> = {
	name: FieldPath<T>;
	register: UseFormRegister<T>;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
	errors: FieldErrors<T>;
};

export type OptionItem = {
	value: string;
	displayValue?: string;
};
