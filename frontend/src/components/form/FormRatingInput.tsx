import { FieldValues } from "react-hook-form";
import { camelToTitleCase } from "../../lib/utils";
import { BaseFormInputProps } from "../../types/formModels";
import ErrorMessage from "./ErrorMessage";

type RatingInputProps<T extends FieldValues> = BaseFormInputProps<T> & {
	maxScore: number;
};

const maskHalfClassNames = Object.freeze(["mask-half-1", "mask-half-2"]);

const FormRatingInput = <T extends FieldValues>({
	maxScore,
	register,
	name,
	label = camelToTitleCase(name),
	defaultValue,
	errors,
}: RatingInputProps<T>) => {
	const error = errors?.[name]?.message as string | undefined;
	return (
		<div className="rating rating-lg rating-half">
			<p className="text-lg font-bold">{label}</p>
			<input
				type="radio"
				name={name}
				value="0"
				className="rating-hidden"
				defaultChecked={!defaultValue}
			/>
			{Array(maxScore * 2)
				.fill(null)
				.map((_, index) => (
					<input
						key={index}
						type="radio"
						value={index + 1}
						defaultChecked={defaultValue ? +defaultValue * 2 === index : false}
						className={`bg-amber-500 mask mask-star-2 ${
							maskHalfClassNames[index % 2]
						}`}
						{...register(name)}
					/>
				))}
			{error && <ErrorMessage message={error} />}
		</div>
	);
};

export default FormRatingInput;
