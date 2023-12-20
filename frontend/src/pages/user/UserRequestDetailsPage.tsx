import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
// import { NodeHorizonLine } from "@/components/ui/NodeHorizonLine";
import { DetailInfoDisplay } from "@/components/display/DetailInfoDisplay";
import { NodeHorizonLine } from "@/components/ui/NodeHorizonLine";
import { useQueryContainer } from "@/features/hooks/useQueryContainer";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditButton from "../../components/ui/EditButton";
import { fireAlert, sweetAlertDefaultOptions } from "../../lib/formUtils";
import { deleteRequestAJAX } from "../../services/api/requestApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import OfferDetailsList from "./requestDetails/components/OfferDetailsList";

const sweetAlertOptions = {
	...sweetAlertDefaultOptions,
	text: "Are you sure you want to delete this?",
};

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

	const queryClient = useQueryClient();
	const { mutateAsync: deleteRequest } = useMutation({
		mutationFn: deleteRequestAJAX,
		onSuccess: async () => {
			toast.success("Deleted request");
			await queryClient.invalidateQueries([queryKey.REQUEST]);
			navigate(siteMap(RouteEnum.UserRequests), { replace: true });
		},
	});
	return details ? (
		<ControlModalContext.Provider
			value={{ isShow: showAcceptForm, setIsShow: setShowAcceptForm }}
		>
			<div className="bg-base-200/80 backdrop-blur-3xl py-12 border-y border-base-300">
				<div className="max-w-7xl max-xl:px-2 mx-auto">
					<NodeHorizonLine>
						<div className="text-slate-400">Your Request</div>
					</NodeHorizonLine>
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
								<EditButton
									label="Edit Request"
									onClick={(e: MouseEvent) => {
										e.preventDefault();
										navigate(
											`${siteMap(RouteEnum.PostRequest)}?requestId=${requestId}`
										);
									}}
								/>
								<button
									className="p-2 border border-rose-400 hover:bg-rose-400 [&_span]:hover:text-white rounded-btn hover:-translate-y-1 overflow-hidden h-12 w-12 transition-all hover:ring-4 ring-rose-200"
									onClick={fireAlert({
										options: sweetAlertOptions,
										onConfirmed: () => deleteRequest({ requestId: requestId! }),
									})}
								>
									<span className="material-symbols-rounded text-rose-400 text-2xl">
										delete
									</span>
								</button>
							</div>

							<hr className="border-base-300 my-4" />
							<DetailInfoDisplay {...details} />
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
