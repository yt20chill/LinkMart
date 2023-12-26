import { maskHalfClassNameArr } from "../../../../lib/formUtils";

type RatingProps = {
	score: number;
	maxScore?: number;
	size?: "xs" | "sm" | "md" | "lg";
};

const Rating = ({ score, maxScore = 5, size = "sm" }: RatingProps) => {
	return (
		<>
			<div className={`rating rating-half rating-${size}`}>
				<input type="radio" className="rating-hidden hidden" />
				{Array(maxScore * 2)
					.fill(null)
					.map((_, index) => (
						<input
							className={`mask mask-star-2 bg-orange-400 ${
								maskHalfClassNameArr[index % 2]
							}`}
							key={index}
							type="radio"
							defaultChecked={Math.floor(score * 2) === index + 1}
							readOnly={true}
						/>
					))}
			</div>
		</>
	);
};

export default Rating;
