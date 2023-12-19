import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { DetailDisplay } from "@/components/display/DetailDisplay";
import { PriceDisplay } from "@/components/display/PriceDisplay";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
// import { NodeHorizonLine } from "@/components/ui/NodeHorizonLine";
import { useQueryContainer } from "@/features/hooks/useQueryContainer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import OfferDetailsList from "./components/OfferDetailsList";

const UserRequestDetailsPage = () => {
	const { requestId } = useParams();
	const navigate = useNavigate();
	const [showAcceptForm, setShowAcceptForm] = useState(false);
	if (!requestId) navigate(siteMap(RouteEnum.UserRequests), { replace: true });
	if (requestId === undefined) navigate("/404", { replace: true });
	const { useGetRequestDetails } = useQueryContainer();
	const { data: details } = useGetRequestDetails({ requestId: requestId! });
	const [currentImage, setCurrentImage] = useState<string>("");
	useEffect(() => {
		if (details) setCurrentImage(details.primaryImage);
	}, [details]);
	return details ? (
		<ControlModalContext.Provider
			value={{ isShow: showAcceptForm, setIsShow: setShowAcceptForm }}
		>
			<div className="bg-base-200/80 backdrop-blur-3xl py-12 border-y border-base-300">
				<div className="max-w-7xl max-xl:px-2 mx-auto">
					{/* <NodeHorizonLine> */}
					<div className="text-slate-400">Your Request</div>
					{/* </NodeHorizonLine> */}
					<main className="flex flex-wrap max-md:px-6 px-12">
						<div className="max-lg:w-full w-1/2 flex flex-col flex-wrap">
							{/*Request Info */}
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
							<div className="flex gap-2">
								<button className="flex items-center justify-center bg-secondary-400 hover:bg-secondary-500 hover:-translate-y-1 text-white py-1 rounded-btn grow h-12 transition-all hover:ring-4 ring-secondary-200">
									<span className="material-symbols-rounded text text-lg">
										edit
									</span>
									Edit Request
								</button>
								<button className="p-2 border border-rose-400 hover:bg-rose-400 [&_span]:hover:text-white rounded-btn hover:-translate-y-1 overflow-hidden h-12 w-12 transition-all hover:ring-4 ring-rose-200">
									<span className="material-symbols-rounded text-rose-400 text-2xl">
										delete
									</span>
								</button>
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
							{/*Request Img */}
							<MainImageFrame
								title={details.item}
								imagePath={currentImage}
								className="max-lg:hidden"
							/>
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
							<hr className="border-base-300 my-4" />
						</div>
						{/*OFFER LIST*/}
						<div className="max-lg:w-full w-1/2 flex flex-col items-center max-lg:pl-0 pl-12 overflow-hidden">
							<div className="bg-base-100/50 w-full rounded-lg border overflow-hidden">
								<div className="border-b px-4 pt-4 pb-2">Offer</div>
								<div className="p-4 bg-base-200">
									<OfferDetailsList requestId={requestId!} />
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</ControlModalContext.Provider>
	) : (
		<RequestCardSkeleton />
	);
};

export default UserRequestDetailsPage;
