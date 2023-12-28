import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetReviewDto } from "../../schemas/responseSchema";

type ReviewCardProps = {
	dto: GetReviewDto;
};

const ReviewCard = ({
	dto: { primaryImage, item, efficiency, attitude, comments, username },
}: ReviewCardProps) => {
	return (
		<div className="flex p-4">
			<figure className="flex w-24 h-24 rounded bg-gray-400 overflow-hidden me-4">
				<img src={primaryImage} alt="item" className="object-cover w-full" />
			</figure>
			<div className="flex grow w-1/2">
				<div>
					<div className="font-bold">
						<i className="bi bi-box-seam me-1"></i>
						<span>{item}</span>
						<span className="text-primary-400/80 ms-2">@{username}</span>
					</div>
					<div className="flex gap-4">
						<div>
							<div className="text-xs text-gray-500">Efficiency</div>
							<div className="flex items-center gap-2">
								<Rating score={efficiency} />
							</div>
						</div>
						<div>
							<div className="text-xs text-gray-500">Attitude</div>
							<div className="flex items-center gap-2">
								<Rating score={attitude} />
							</div>
						</div>
					</div>

					<div className="text-xs text-gray-500">Comments</div>
					{comments && (
						<div className="w-full text-justify px-1">{comments}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
