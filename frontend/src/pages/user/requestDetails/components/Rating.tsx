import { maskHalfClassNameArr } from "../../../../lib/formUtils";
import { camelToTitleCase } from "../../../../lib/utils";

type RatingProps = {
  size?: string;
  name: string;
  label?: string;
  score: number;
  maxScore?: number;
  readOnly?: boolean;
};

const Rating = ({
  size,
  name,
  label = camelToTitleCase(name),
  score,
  maxScore = 5,
  readOnly = name === "",
}: RatingProps) => {
  const starSize = () => {
    switch (size) {
      case "lg":
        return "rating-lg";
      case "md":
        return "rating-md";
      case "sm":
        return "rating-sm";
      case "xs":
        return "rating-xs";
      default:
        return "rating-sm";
    }
  };
  return (
    <>
      <span>{label}</span>
      <div className={`rating rating-half ${starSize()}`}>
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
