import Rating from "../../pages/user/requestDetails/components/Rating";
import { GetProviderProfileDto } from "../../schemas/responseSchema";

type ProviderInfoDisplayProps = {
	dto: Omit<GetProviderProfileDto, "reviews">;
};

const ProviderInfoDisplay = ({
	dto: {
		username,
		totalReviews,
		averageAttitude,
		averageEfficiency,
		biography,
	},
}: ProviderInfoDisplayProps) => {
	return (
		<div>
			<p>{username}</p>
			<p>Rating ({totalReviews})</p>
			<div className="flex">
				<p>Efficiency</p>
				<Rating name="" score={averageEfficiency} />
			</div>
			<div className="flex">
				<p>Attitude</p>
				<Rating name="" score={averageAttitude} />
			</div>
			<p>Bio</p>
			<textarea defaultValue={biography ?? ""} readOnly></textarea>
		</div>
	);
};

export default ProviderInfoDisplay;
