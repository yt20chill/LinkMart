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
			<div>
				<hr />
				<p className="text-xl font-bold">Review ({totalReviews})</p>
				<hr />
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
