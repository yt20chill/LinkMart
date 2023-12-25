import ReviewCard from "../../components/card/ReviewCard";
import { GetProviderProfileDto } from "../../schemas/responseSchema";
import ProviderInfoDisplay from "./ProviderInfoDisplay";

type ProviderProfileDisplayProps = {
  dto: GetProviderProfileDto;
};

const ProviderProfileDisplay = ({
  dto: {
    username,
    averageAttitude,
    averageEfficiency,
    totalReviews,
    biography,
    reviews,
  },
}: ProviderProfileDisplayProps) => {
  return (
    <>
      {/* Info */}
      <ProviderInfoDisplay
        dto={{
          username,
          averageAttitude,
          averageEfficiency,
          totalReviews,
          biography,
        }}
      />
      {/* Reviews */}
      <div className="p-6 bg-base-100 rounded-xl">
        <p className="text-xl font-bold">Review ({totalReviews})</p>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={`${review.item}-${index}`} dto={review} />
          ))
        ) : (
          <p>No reviews available yet</p>
        )}
      </div>
    </>
  );
};

export default ProviderProfileDisplay;
