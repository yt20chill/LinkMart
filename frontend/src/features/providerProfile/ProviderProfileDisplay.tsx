import ReviewCard from "../../components/card/ReviewCard";
import { GetProviderProfileDto } from "../../schemas/responseSchema";
import NoReviewsDisplay from "./NoReviewsDisplay";
import ProviderInfoDisplay from "./ProviderInfoDisplay";

type ProviderProfileDisplayProps = {
	dto: GetProviderProfileDto;
};

const ProviderProfileDisplay = ({
	dto: {
		providerName,
		starOfAttitude,
		starOfEfficiency,
		numberOfReviews,
		biography,
		reviews,
	},
}: ProviderProfileDisplayProps) => {
	return (
		<>
			{/* Info */}
			<ProviderInfoDisplay
				dto={{
					providerName,
					starOfAttitude,
					starOfEfficiency,
					numberOfReviews,
					biography,
				}}
			/>
			{/* Reviews */}
			<div className="flex flex-col bg-base-100 rounded-xl mb-6 sm:border border-slate-500/20 sm:mx-6">
				<h2 className="font-bold p-4 pb-2 border-b border-slate-500/20 text-gray-500">
					<i className="bi bi-chat-square-text-fill me-2"></i>Review (
					{numberOfReviews})
				</h2>
				<div className="flex flex-col divide-y divide-slate-500/20">
					{reviews && reviews.length > 0 ? (
						reviews.map((review, index) => (
							<ReviewCard key={`${review.item}-${index}`} dto={review} />
						))
					) : (
						<div className="p-6">
							<NoReviewsDisplay />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ProviderProfileDisplay;
