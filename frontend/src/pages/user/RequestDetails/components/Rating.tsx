import { maskHalfClassNameArr } from "../../../../lib/formUtils";
import { camelToTitleCase } from "../../../../lib/utils";

type RatingProps = {
  name: string;
  label: string;
  score: number;
  maxScore?: number;
  readOnly?: boolean;
};

const Rating = ({
  name,
  label = camelToTitleCase(name),
  score,
  maxScore = 5,
  readOnly = false,
}: RatingProps) => {
  return (
    <>
      <span>{label}</span>
      <div className="rating rating-sm rating-half">
        <input type="radio" name={name} className="rating-hidden hidden" />
        {Array(maxScore * 2)
          .fill(null)
          .map((_, index) => (
            <input
              className={`mask mask-star-2 bg-orange-400 ${
                maskHalfClassNameArr[index % 2]
              }`}
              key={index}
              type="radio"
              name={name}
              checked={Math.floor(score * 2) === index + 1}
              readOnly={readOnly}
            />
          ))}
      </div>
    </>
  );
};

export default Rating;
