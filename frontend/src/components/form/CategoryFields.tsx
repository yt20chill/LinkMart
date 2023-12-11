import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useCategoryOptions } from "../../features/hooks/useCategoryOptions";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

type CategoryFieldsFormProps<T extends FieldValues = Record<string, string>> = {
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	categoryId: number;
	defaultValuesJSON?: Record<string, string>;
};

const CategoryFieldsForm = ({
	register,
	errors,
	categoryId,
	defaultValuesJSON,
}: CategoryFieldsFormProps) => {
	if (categoryId === undefined) throw new Error("Invalid category id");
	const { dropDownFields, textFields, defaultEmptyValues } =
		useCategoryOptions(categoryId);
	const defaultValues = defaultValuesJSON ?? defaultEmptyValues;
	return (
		<>
			{dropDownFields.map((field) => {
				const fieldName = Object.keys(field)[0];
				const fieldOptions = field[fieldName];
				return (
					<FormSelect
						key={fieldName}
						name={fieldName}
						register={register}
						errors={errors}
						optionItems={fieldOptions.map((option) => ({
							value: option,
						}))}
						defaultValue={defaultValues[fieldName] ?? undefined}
					/>
				);
			})}
			{textFields.map((fieldName) => (
				<FormInput
					key={fieldName}
					name={fieldName}
					register={register}
					errors={errors}
					defaultValue={defaultValues[fieldName] ?? undefined}
				/>
			))}
		</>
	);
};

export default CategoryFieldsForm;