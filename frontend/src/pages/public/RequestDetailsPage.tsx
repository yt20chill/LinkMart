import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { DetailInfoDisplay } from "@/components/display/DetailInfoDisplay";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
import {
  BriefOfferResponseDto,
  RequestDetailsDto,
} from "@/schemas/responseSchema";
import {
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { SweetAlertOptions } from "sweetalert2";
import { useShallow } from "zustand/react/shallow";
import { RequestCard } from "../../components/card/RequestCard";
import { RequestCardSkeleton } from "../../components/card/RequestCardSkeleton";
import FormModal from "../../components/modal/FormModal";
import CancelButton from "../../components/ui/CancelButton";
import EditButton from "../../components/ui/EditButton";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OfferForm from "../../features/forms/OfferForm";
import {
  useGetRecommendations,
  useGetRequestDetails,
} from "../../features/hooks/useQueryContainer";
import useRedirectOnCondition from "../../features/hooks/useRedirectOnCondition";
import { dtoToString, fireAlert } from "../../lib/formUtils";
import { moveImageToFront } from "../../lib/formattingUtils";
import {
  checkHasOfferedAJAX,
  deleteOfferAJAX,
} from "../../services/api/offerApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import { AuthorizeLevels } from "../../types/authModels";

const RECOMMENDATION_NUM = 5;

const RequestDetailsPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  useRedirectOnCondition(!requestId, RouteEnum.Requests, "invalid request");
  const { role, username } = useAuthStore(
    useShallow((state) => ({
      role: state.role,
      username: state.username,
    }))
  );

  const { data: checkOffer, isLoading: checkingOffer } = useQuery({
    queryKey: [queryKey.OFFER, { requestId }],
    queryFn: () => checkHasOfferedAJAX(requestId!),
    enabled: role === AuthorizeLevels.PROVIDER,
  });
  const searchParams = useRef(new URLSearchParams());
  const { data: details } = useGetRequestDetails({ requestId: requestId! });
  const memoizedDetails = useMemo<RequestDetailsDto | undefined>(
    () => details,
    [details]
  );

  const [currentImage, setCurrentImage] = useState<string>("");
  const [showPostOfferModal, setShowPostOfferModal] = useState(false);
  useEffect(() => {
    if (memoizedDetails) {
      // still redirect here for manual typing url
      if (username === memoizedDetails.createdBy)
        navigate(`${siteMap(RouteEnum.UserRequestDetail)}/${requestId}`, {
          replace: true,
        });
      searchParams.current.set("location", memoizedDetails.locationName);
      searchParams.current.set("category", memoizedDetails.categoryName);
      setCurrentImage(memoizedDetails.primaryImage);
    }
  }, [memoizedDetails, username, requestId, navigate]);
  return memoizedDetails ? (
    <>
      <div className="bg-base-200/80 backdrop-blur-3xl py-12 border-b-8 border-primary-400">
        <div className="max-w-7xl max-xl:px-2 mx-auto">
          <main className="flex flex-wrap max-md:px-6 px-12">
            {/*Request Img */}
            <div className="max-md:w-full w-2/5 flex flex-col flex-wrap max-md:order-2">
              <MainImageFrame
                title={memoizedDetails.item}
                imagePath={currentImage}
              />
              <div className="mt-2 grid grid-cols-5 relative gap-2">
                {moveImageToFront(
                  memoizedDetails.images,
                  memoizedDetails.primaryImage
                ).map((itm) => (
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
              <SectionTitle icon="package_2" content="Request Item" />
              <div className="inline-flex max-md:text-2xl text-3xl font-bold mb-2">
                {memoizedDetails.item}
              </div>
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-2">
                  <PillBadge content={memoizedDetails.locationName} />
                  <PillBadge content={memoizedDetails.categoryName} />
                </div>
                <DateBadge date={memoizedDetails.updatedAt} />
              </div>
              <div className="flex justify-end">
                <PrimaryButton
                  icon="add_shopping_cart"
                  className="px-6 py-3 me-auto bg-primary-400 hover:bg-primary-500 hover:ring-primary-400/20 border-primary-400 rounded-[30px]"
                  label="Want Too"
                  onClick={() => {
                    navigate(
                      `${siteMap(RouteEnum.PostRequest)}?cloneId=${requestId}`
                    );
                  }}
                />
                <div className="flex flex-wrap justify-end items-center">
                  <IconCircleFrame username="fakeRequest.createdBy" />
                  <div>
                    <span className="text-slate-400/80 flex items-center gap-1 font-roboto tracking-wide text-xs leading-none">
                      Created By
                    </span>
                    {memoizedDetails.createdBy}
                  </div>
                </div>
              </div>

              <hr className="border-base-300 my-4" />
              <DetailInfoDisplay {...memoizedDetails} />
              {/* fail to check offer will assume the provider has no prev offers */}
              {role === AuthorizeLevels.PROVIDER &&
                (checkOffer?.hasOffer ? (
                  <MyOffer {...checkOffer.offer} />
                ) : (
                  <PrimaryButton
                    icon="note_stack_add"
                    className={`py-3`}
                    label={"Make An Offer"}
                    onClick={() => setShowPostOfferModal(true)}
                    disabled={checkingOffer}
                  />
                ))}
            </div>
            <hr className="border-base-300 my-4" />
          </main>
        </div>
      </div>
      <RecommendationsLayout
        location={memoizedDetails.locationName}
        category={memoizedDetails.categoryName}
      >
        <Recommendations
          searchParams={searchParams.current}
          currentRequestId={requestId!}
        />
      </RecommendationsLayout>
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
    </>
  ) : (
    <RequestCardSkeleton />
  );
};

export default RequestDetailsPage;

type RecommendationsProps = {
  currentRequestId: string;
  searchParams: URLSearchParams;
};

const Recommendations = ({
  currentRequestId,
  searchParams,
}: RecommendationsProps) => {
  const { recommendations } = useGetRecommendations({
    location: searchParams.get("location") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    limit: RECOMMENDATION_NUM + 1, //+1 for potential filtering current request
  });
  // return skeleton if recommendation is undefined (error or loading)
  if (!recommendations)
    return Array(RECOMMENDATION_NUM)
      .fill(null)
      .map((_, index) => <RequestCardSkeleton key={index} />);
  // trigger rerendering by mutating searchParams
  if (recommendations.length === 0) {
    if (searchParams.has("location")) searchParams.delete("location");
    else if (searchParams.has("category")) searchParams.delete("category");
    else return <div>No recommendation yet...</div>;
  }
  return (
    <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
      {recommendations
        .filter((request) => request.requestId !== currentRequestId)
        .slice(0, RECOMMENDATION_NUM - 1)
        .map((request) => (
          <RequestCard
            key={request.requestId}
            {...request}
            className="shadow"
          />
        ))}
    </div>
  );
};

type LayoutProps = {
  children: ReactNode;
  location: string;
  category: string;
};

const RecommendationsLayout = ({
  children,
  location,
  category,
}: LayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="backdrop-blur-3xl py-12">
      <div className="max-w-7xl px-6 mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-bold text-primary-400 text-2xl mt-2 inline-flex items-center gap-1 drop-shadow-lg">
            <img src="/image/tags/tag_shopping_bag.png" className="h-5" />
            <span className="capitalize">You May Also Like</span>
          </h2>
          <div
            className="text-end text-lg cursor-pointer bg-primary-400 text-base-100 flex items-center px-6 rounded-badge hover:bg-primary-500 hover:-translate-y-1 hover:ring-2 hover:ring-offset-2 ring-primary-400/50 transition-all"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                `${siteMap(
                  RouteEnum.Requests
                )}?location=${location}&category=${category}`
              );
            }}
          >
            <span className="drop-shadow text-white">More</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const sweetAlertOptions: SweetAlertOptions = {
  title: "Confirm Delete This Offer?",
  text: "This action cannot be undone",
  icon: "warning",
  showCancelButton: true,
};

const MyOffer = ({
  offerId,
  price,
  estimatedProcessTime,
  offerRemark,
}: BriefOfferResponseDto) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteOffer, isLoading } = useMutation({
    mutationFn: deleteOfferAJAX,
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.OFFER]);
    },
  });
  const defaultValues = dtoToString({
    price,
    estimatedProcessTime,
    offerRemark,
  });
  const onEdit = (e: MouseEvent) => {
    e.preventDefault();
    setShowEditForm(true);
  };
  const onDelete = async () => {
    await deleteOffer(offerId);
  };
  return (
    <>
      <div className="bg-base-100 rounded-lg w-full mb-2 shadow">
        <div className="flex items-center justify-start indent-3 text-lg border-b p-2 border-slate-500/20">
          My Offer
        </div>
        <div className="max-md:px-3 px-6 py-3">
          <div className="flex flex-wrap gap-12 mb-2">
            <div
              className="flex items-center gap-[2px] tooltip"
              data-tip="Offer Price"
            >
              <span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
                attach_money
              </span>
              <b className="font-normal">{price.toLocaleString("en")}</b>
            </div>
            <div
              className="flex items-center gap-[2px] tooltip"
              data-tip="Estimated Process Time"
            >
              <span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
                schedule
              </span>
              <b className="font-normal">
                {estimatedProcessTime}
                <span className="pl-1 text-sm text-slate-400">Days</span>
              </b>
            </div>
          </div>

          {offerRemark && (
            <div
              className="inline-flex items-center gap-[2px] tooltip"
              data-tip="Provider Remarks"
            >
              <span className="material-symbols-rounded icn-fill text-slate-300 text-lg">
                contact_support
              </span>
              <span className="truncate">{offerRemark}</span>
            </div>
          )}

          <div className="flex w-full">
            <div className="flex w-full justify-end items-center gap-2">
              <EditButton className="h-12 grow" label="Edit" onClick={onEdit} />
              <CancelButton
                className="h-12"
                label="Delete"
                onClick={fireAlert({
                  options: sweetAlertOptions,
                  onConfirmed: onDelete,
                })}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <ControlModalContext.Provider
        value={{ isShow: showEditForm, setIsShow: setShowEditForm }}
      >
        <FormModal>
          <OfferForm offerId={offerId} defaultValues={defaultValues} />
        </FormModal>
      </ControlModalContext.Provider>
    </>
  );
};
