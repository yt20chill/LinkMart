import { camelToTitleCase } from "../../../../lib/utils";

type RatingProps = {
	name: string;
	label: string;
	score: number;
	maxScore?: number;
};

const Rating = ({
	name,
	label = camelToTitleCase(name),
	score,
	maxScore = 5,
}: RatingProps) => {
	return (
		<>
			<span>{label}</span>
			<div className="rating rating-md pointer-events-none">
				{Array(maxScore)
					.fill(null)
					.map((_, index) => (
						<input
							key={index}
							type="radio"
							name={name}
							checked={Math.floor(score) === index}
						/>
					))}
			</div>
		</>
	);
};

export default Rating;
