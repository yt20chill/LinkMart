import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetReviewDto } from "../../schemas/responseSchema";

type ReviewCardProps = {
	dto: GetReviewDto;
};

const ReviewCard = ({
	dto: { primaryImage, item, efficiency, attitude, comments },
}: ReviewCardProps) => {
	return (
		<div className="flex p-4">
			<div className="w-96 h-96 overflow-hidden me-10">
				<img src={primaryImage} alt="item" />
			</div>
			<div className="flex-grow p-2">
				<div>
					<div className="font-bold">{item}</div>
					<div>Efficiency</div>
					<Rating name="" score={efficiency} />
					<div>Attitude</div>
					<Rating name="" score={attitude} />
					<div>Comments</div>
					<textarea className="w-96 h-96" readOnly>
						{comments}
					</textarea>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
