import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { DetailDisplay } from "@/components/display/DetailDisplay";
import { PriceDisplay } from "@/components/display/PriceDisplay";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
import { RequestDetailsDto } from "@/schemas/responseSchema";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { RequestCardSkeleton } from "../../components/card/RequestCardSkeleton";
import FormModal from "../../components/modal/FormModal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OfferForm from "../../features/forms/OfferForm";
import { useQueryContainer } from "../../features/hooks/useQueryContainer";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import { AuthorizeLevels } from "../../types/authModels";

const RequestDetailsPage = () => {
	const { requestId } = useParams();
	const navigate = useNavigate();
	if (requestId === undefined) navigate("/404", { replace: true });
	const { role, username } = useAuthStore(
		useShallow((state) => ({
			role: state.role,
			username: state.username,
		}))
	);
	const { useGetRequestDetails } = useQueryContainer();
	const { data: details } = useGetRequestDetails({ requestId: requestId! });
	const memoizedDetails = useMemo<RequestDetailsDto | undefined>(
		() => details,
		[details]
	);
	const [currentImage, setCurrentImage] = useState<string>("");
	const [showPostOfferModal, setShowPostOfferModal] = useState(false);
	useEffect(() => {
		if (memoizedDetails) {
			if (username === memoizedDetails.createdBy)
				navigate(`${siteMap(RouteEnum.UserRequestDetail)}/${requestId}`, {
					replace: true,
				});
			setCurrentImage(memoizedDetails.primaryImage);
		}
	}, [memoizedDetails, username, requestId, navigate]);
	return details ? (
		<div className="bg-base-200/80 backdrop-blur-3xl py-12 border-y border-base-300">
			<div className="max-w-7xl max-xl:px-2 mx-auto">
				<main className="flex flex-wrap max-md:px-6 px-12">
					{/*Request Img */}
					<div className="max-md:w-full w-2/5 flex flex-col flex-wrap max-md:order-2">
						<MainImageFrame title={details.item} imagePath={currentImage} />
						<div className="mt-2 grid grid-cols-5 relative gap-2">
							{details.images.map((itm) => (
								<SubImageFrame
									key={itm.imagePath}
									imagePath={itm.imagePath}
									onClick={(e) =>
										setCurrentImage((e.target as HTMLImageElement).src)
									}
								/>
							))}
						</div>
					</div>
					{/*Request Info */}
					<div className="max-md:w-full w-3/5 flex flex-col flex-wrap max-md:pl-0 max-md:pt-6 pl-12 mb-3">
						<SectionTitle icon="package_2" content={"Request Item"} />
						<div className="inline-flex max-md:text-2xl text-3xl font-bold mb-2">
							{details.item}
						</div>

						<div className="flex justify-between items-start mb-5">
							<div className="flex gap-2">
								<PillBadge content={details.locationName} />
								<PillBadge content={details.categoryName} />
							</div>
							<DateBadge date={details.updatedAt} />
						</div>
						<div className="flex flex-wrap justify-end items-center">
							<IconCircleFrame username="fakeRequest.createdBy" />
							<div>
								<span className="text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-xs leading-none">
									Created By
								</span>
								{details.createdBy}
							</div>
						</div>
						<hr className="border-base-300 my-4" />
						<SectionTitle icon="view_list" content={"Details"} />
						<div className="grid max-md:grid-cols-2 grid-cols-3 gap-2 p-5">
							<DetailDisplay
								title={details.locationName}
								label={"From"}
								value={details.locationName.split(" ").slice(1, 10).join(" ")}
							/>
							{Object.entries(details.itemDetail ?? []).map(([key, val]) => {
								return (
									<DetailDisplay
										key={`${key}-${val}`}
										className={val && val.length > 20 ? "col-span-2" : ""}
										label={key}
										value={val ?? ""}
										title={val ?? ""}
									/>
								);
							})}
							{details.requestRemark && (
								<DetailDisplay
									icon="info"
									className="col-span-3"
									label="Remark"
									value={details.requestRemark}
								/>
							)}
						</div>
						<div className="text-right">
							<PriceDisplay
								badge={true}
								badgeContent="Offer"
								price={details.offerPrice}
							/>
						</div>

						<hr className="border-base-300 my-4" />
						{role === AuthorizeLevels.PROVIDER && (
							<PrimaryButton
								label="Offer"
								onClick={() => setShowPostOfferModal(true)}
							/>
						)}

						<PrimaryButton
							label="Clone"
							onClick={() => {
								navigate(
									`${siteMap(RouteEnum.PostRequest)}?cloneId=${requestId}`
								);
							}}
						/>
					</div>
				</main>
			</div>
			{showPostOfferModal && (
				<ControlModalContext.Provider
					value={{
						isShow: showPostOfferModal,
						setIsShow: setShowPostOfferModal,
					}}
				>
					<FormModal>
						<OfferForm requestId={requestId!} />
					</FormModal>
				</ControlModalContext.Provider>
			)}
		</div>
	) : (
		<RequestCardSkeleton />
	);
};

export default RequestDetailsPage;
