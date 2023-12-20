import { camelToTitleCase } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useCategoryOptions } from "../../features/hooks/useCategoryOptions";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

type CategoryFieldsFormProps<
	T extends Record<string, unknown> = Record<string, unknown>
> = {
	keyName: string;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	category: { id: number; name: string };
	defaultValuesJSON?: Record<string, string>;
};

const CategoryFieldsForm = ({
	keyName,
	register,
	errors,
	category,
	defaultValuesJSON,
}: CategoryFieldsFormProps) => {
	if (category?.id === undefined) throw new Error("Invalid category id");
	const { dropDownFields, textFields, defaultEmptyValues } = useCategoryOptions(
		category.id
	);
	const defaultValues = defaultValuesJSON ?? defaultEmptyValues;
	return (
		<div className="mt-3">
			{(dropDownFields.length > 0 || textFields.length > 0) && (
				<div className="inline-flex border-b-8  border-slate-300 text-3xl font-bold text-slate-500">
					{category.name} Options
				</div>
			)}
			<div className="">
				{dropDownFields.map((field) => {
					const fieldName = Object.keys(field)[0];
					const fieldOptions = field[fieldName];
					return (
						<FormSelect
							key={fieldName}
							name={`${keyName}.${fieldName}`}
							label={camelToTitleCase(fieldName)}
							register={register}
							errors={errors}
							optionItems={fieldOptions.map((option) => ({
								value: option,
							}))}
							defaultValue={defaultValues[fieldName] ?? ""}
						/>
					);
				})}
				{textFields.map((fieldName) => (
					<FormInput
						key={fieldName}
						name={`${keyName}.${fieldName}`}
						label={camelToTitleCase(fieldName)}
						register={register}
						errors={errors}
						defaultValue={defaultValues[fieldName] ?? ""}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryFieldsForm;
