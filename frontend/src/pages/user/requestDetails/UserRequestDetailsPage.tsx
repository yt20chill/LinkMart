import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { RequestCardSkeleton } from "@/components/card/RequestCardSkeleton";
import { DetailInfoDisplay } from "@/components/display/DetailInfoDisplay";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import FormModal from "@/components/modal/FormModal";
import { SectionTitle } from "@/components/title/SectionTitle";
import { NodeHorizonLine } from "@/components/ui/NodeHorizonLine";
import AcceptOfferForm from "@/features/forms/AcceptOfferForm";
import { useGetRequestDetails } from "@/features/hooks/useQueryContainer";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditButton from "../../../components/ui/EditButton";
import Tooltip from "../../../components/ui/Tooltip";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import { fireAlert, sweetAlertDefaultOptions } from "../../../lib/formUtils";
import { moveImageToFront } from "../../../lib/formattingUtils";
import { ImageDto } from "../../../schemas/responseSchema";
import {
	declineOfferAJAX,
	getAllOffersByRequestIdAJAX,
} from "../../../services/api/offerApi";
import {
	deleteRequestAJAX,
	setRequestPrimaryImageAJAX,
} from "../../../services/api/requestApi";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { OfferDetailsContext } from "../../../services/context/OfferDetailsContext";
import { queryKey } from "../../../services/query.config";
import { RouteEnum, siteMap } from "../../../services/routes.config";
import OfferDetailsList from "./components/OfferDetailsList";

const sweetAlertOptions = {
	...sweetAlertDefaultOptions,
	text: "Are you sure you want to delete this?",
};

type CurrentImage = ImageDto & {
	isPrimary: boolean;
};

const UserRequestDetailsPage = () => {
	const { requestId } = useParams();
	const [offerId, setOfferId] = useState("");
	const [isShow, setIsShow] = useState(false);
	useRedirectOnCondition(!requestId, RouteEnum.UserRequests, "invalid request");
	const { data: details } = useGetRequestDetails({ requestId: requestId! });
	const [currentImage, setCurrentImage] = useState<CurrentImage | undefined>(
		undefined
	);
	useEffect(() => {
		if (details) {
			const primaryImage = details.images.find(
				(image) => image.imagePath === details.primaryImage
			);
			if (primaryImage) setCurrentImage({ ...primaryImage, isPrimary: true });
		}
	}, [details]);
	const queryClient = useQueryClient();
	const { data: offers, isLoading: isGettingOffers } = useQuery({
		queryKey: [queryKey.OFFER, { requestId }],
		queryFn: () => getAllOffersByRequestIdAJAX({ requestId: requestId! }),
	});

	const { mutateAsync: onDecline } = useMutation({
		mutationFn: declineOfferAJAX,
		onSuccess: async () => {
			toast.success("Offer has been declined");
			await queryClient.invalidateQueries([queryKey.OFFER, { requestId }]);
		},
	});
	const onAccept = (offerId: string) => {
		setOfferId(offerId);
		setIsShow(true);
	};
	const { mutateAsync: updatePrimary, isLoading: isUpdatingPrimary } =
		useMutation({
			mutationFn: setRequestPrimaryImageAJAX,
			onSuccess: async () => {
				toast.success("Primary image has been changed");
				await queryClient.invalidateQueries([queryKey.REQUEST, { requestId }]);
			},
		});
	const onUpdate = async (e: MouseEvent) => {
		e.preventDefault();
		if (!currentImage || currentImage.isPrimary) return;
		await updatePrimary(currentImage.imageId);
	};

	return details ? (
		<>
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
								<UpdateButtons
									disabled={!!offers?.length}
									requestId={requestId!}
								/>
							</div>

							<hr className="border-base-300 my-4" />
							<DetailInfoDisplay {...details} />
							{/*Request Img */}
							<div className="grid grid-cols-2 gap-2">
								<div className="relative">
									<MainImageFrame
										title={details.item}
										imagePath={currentImage?.imagePath ?? ""}
										className=""
									/>
									{isUpdatingPrimary ? (
										<span className="absolute m-2 top-1 right-1 text-2xl  text-secondary-400 loading loading-spinner loading-sm"></span>
									) : (
										<button
											className="absolute m-2 top-1 right-1 text-2xl text-secondary-400 hover:text-secondary-500 transition-all"
											onClick={onUpdate}
										>
											<i
												className={`bi ${
													currentImage?.imagePath === details.primaryImage
														? "bi-star-fill"
														: "bi-star"
												}`}
											></i>
										</button>
									)}
								</div>
								<div className="grid grid-cols-4 relative gap-2 grow">
									{moveImageToFront(details.images, details.primaryImage).map(
										(itm) => (
											<SubImageFrame
												key={itm.imageId}
												imagePath={itm.imagePath}
												onClick={() =>
													setCurrentImage({
														...itm,
														isPrimary: itm.imagePath === details.primaryImage,
													})
												}
											/>
										)
									)}
								</div>
							</div>
							<hr className="border-base-300 my-4" />
						</div>
						{/*OFFER LIST*/}
						{offers && (
							<OfferDetailsContext.Provider
								value={{
									offersDetails: offers,
									onDecline,
									onAccept,
									isLoading: isGettingOffers,
								}}
							>
								<div className="max-lg:w-full w-1/2 flex flex-col items-center max-lg:pl-0 pl-12 overflow-hidden">
									<div className="bg-base-100/50 w-full rounded-lg border border-slate-500/20 overflow-hidden">
										<div className="border-b border-slate-500/20 px-4 pt-4 pb-2">
											Offer
										</div>
										<div className="p-4 bg-base-200">
											<OfferDetailsList />
										</div>
									</div>
								</div>
							</OfferDetailsContext.Provider>
						)}
					</main>
				</div>
			</div>
			<ControlModalContext.Provider value={{ isShow, setIsShow }}>
				<FormModal>
					<AcceptOfferForm offerId={offerId} />
				</FormModal>
			</ControlModalContext.Provider>
		</>
	) : (
		<RequestCardSkeleton />
	);
};

export default UserRequestDetailsPage;

type UpdateButtonsProps = {
	disabled: boolean;
	requestId: string;
};
const UpdateButtons = ({ disabled, requestId }: UpdateButtonsProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutateAsync: deleteRequest } = useMutation({
		mutationFn: deleteRequestAJAX,
		onSuccess: async () => {
			toast.success("Deleted request");
			await queryClient.invalidateQueries([queryKey.REQUEST]);
			navigate(siteMap(RouteEnum.UserRequests), { replace: true });
		},
	});
	const disableAlert = fireAlert({
		options: {
			title: "Cannot edit request",
			text: "Decline all the offers to edit this request",
			icon: "error",
			showConfirmButton: false,
			showCancelButton: true,
			cancelButtonText: "Back",
		},
		onConfirmed: () => {},
	});
	return (
		<>
			{disabled ? (
				<Tooltip message="Decline all the offers to edit this request">
					<EditButton
						className="bg-slate-400 user-select-none pointer-events-none"
						label="Edit Request"
						onClick={disableAlert}
					/>
				</Tooltip>
			) : (
				<EditButton
					label="Edit Request"
					onClick={(e) => {
						e.preventDefault();
						navigate(
							`${siteMap(RouteEnum.PostRequest)}?requestId=${requestId}`
						);
					}}
				/>
			)}
			<button
				className="p-2 border border-rose-400 hover:bg-rose-400 [&_span]:hover:text-white rounded-btn hover:-translate-y-1 overflow-hidden h-12 w-12 transition-all hover:ring-4 ring-rose-200"
				onClick={fireAlert({
					options: sweetAlertOptions,
					onConfirmed: () => deleteRequest({ requestId }),
				})}
			>
				<span className="material-symbols-rounded text-rose-400 text-2xl">
					delete
				</span>
			</button>
		</>
	);
};
