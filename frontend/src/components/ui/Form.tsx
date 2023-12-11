import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
	Control,
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
} from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { camelToTitleCase, cn } from "@/lib/utils";
import {
	FormFieldContext,
	FormItemContext,
} from "../../features/forms/formContext";
import { allowedFileTypes } from "../../features/forms/requestSchema/requestSchema";
import { useFormField } from "../../features/hooks/useFormField";
import { FormFieldContextValue, FormInputType } from "../../types/formModels";
import { Input } from "./Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./Select";

const Form = FormProvider;

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn("space-y-2", className)} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={cn(error && "text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

interface FormInputFieldProps<TFieldValues extends FieldValues = FieldValues> {
	formControl: Control<
		TFieldValues,
		React.Context<FormFieldContextValue<FieldValues, string>>
	>;
	fieldName: FieldPath<TFieldValues>;
	label?: string;
	inputType?: FormInputType;
	placeHolder?: string;
}

const FormInput = <T extends FieldValues = FieldValues>({
	formControl,
	fieldName,
	label = camelToTitleCase(fieldName.toString()),
	inputType = "text",
	placeHolder = label
		.toString()
		.replace(/^[a-z]/, (char) => char.toUpperCase()),
}: FormInputFieldProps<T>) => {
	return (
		<FormField
			control={formControl}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{/* TODO: add a visible password toggle? */}
						<Input type={inputType} placeholder={placeHolder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

interface FormFileInputProps<TFieldValues extends FieldValues = FieldValues> {
	formControl: Control<
		TFieldValues,
		React.Context<FormFieldContextValue<FieldValues, string>>
	>;
	fieldName: FieldPath<TFieldValues>;
	label?: string;
	placeHolder?: string;
	accept?: string;
}

const FormFileInput = <T extends FieldValues = FieldValues>({
	formControl,
	fieldName,
	label = camelToTitleCase(fieldName),
	accept = allowedFileTypes.join(","),
}: FormFileInputProps<T>) => {
	return (
		<FormField
			control={formControl}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							multiple={true}
							accept={accept}
							type="file"
							onChange={(e) =>
								field.onChange(e.target.files ? Array.from(e.target.files) : [])
							}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

interface BaseFormSelectProps<TFieldValues extends FieldValues = FieldValues> {
	formControl: Control<
		TFieldValues,
		React.Context<FormFieldContextValue<FieldValues, string>>
	>;
	fieldName: FieldPath<TFieldValues>;
	label?: string;
	placeholder?: string;
}

type TSelectItem = {
	id: string;
	name: string;
};
interface FormSelectWithIdProps<TFieldValues extends FieldValues = FieldValues>
	extends BaseFormSelectProps<TFieldValues> {
	items: Array<TSelectItem>;
}

const FormSelectWithId = <T extends FieldValues = FieldValues>({
	formControl,
	fieldName,
	items,
	label = camelToTitleCase(fieldName),
	placeholder = `Select ${label}`,
}: FormSelectWithIdProps<T>) => {
	return (
		<FormField
			control={formControl}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={undefined}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{items.map((item) => (
								<SelectItem key={item.id} value={item.id}>
									{item.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

interface FormSelectWithStringProps<
	TFieldValues extends FieldValues = FieldValues
> extends BaseFormSelectProps<TFieldValues> {
	items: Array<string>;
	defaultValue?: string;
}

const FormSelectWithString = <T extends FieldValues = FieldValues>({
	formControl,
	fieldName,
	items,
	defaultValue,
	label = camelToTitleCase(fieldName),
	placeholder = `Select ${label}`,
}: FormSelectWithStringProps<T>) => {
	return (
		<FormField
			control={formControl}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={defaultValue}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{items.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormFileInput,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
	FormSelectWithId,
	FormSelectWithString,
};
