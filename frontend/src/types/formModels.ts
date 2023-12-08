import { FieldPath, FieldValues } from "react-hook-form";

export type FormInputType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "radio"
	| "file";

export type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

export type FormItemContextValue = {
	id: string;
};
