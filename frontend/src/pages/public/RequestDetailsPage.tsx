import { DateBadge } from "@/components/badge/DateBadge";
import { PillBadge } from "@/components/badge/PillBadge";
import { DetailInfoDisplay } from "@/components/display/DetailInfoDisplay";
import { IconCircleFrame } from "@/components/frame/IconCircleFrame";
import { MainImageFrame } from "@/components/imageFrame/MainImageFrame";
import { SubImageFrame } from "@/components/imageFrame/SubImageFrame";
import { SectionTitle } from "@/components/title/SectionTitle";
import { RequestDetailsDto } from "@/schemas/responseSchema";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { RequestCard } from "../../components/card/RequestCard";
import { RequestCardSkeleton } from "../../components/card/RequestCardSkeleton";
import FormModal from "../../components/modal/FormModal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OfferForm from "../../features/forms/OfferForm";
import {
  useGetRecommendations,
  useGetRequestDetails,
} from "../../features/hooks/useQueryContainer";
import useRedirectOnCondition from "../../features/hooks/useRedirectOnCondition";
import { checkHasOfferedAJAX } from "../../services/api/offerApi";
import { ControlModalContext } from "../../services/context/ControlModalContext";
import { queryKey } from "../../services/query.config";
import { RouteEnum, siteMap } from "../../services/routes.config";
import { useAuthStore } from "../../services/stores/authStore";
import { AuthorizeLevels } from "../../types/authModels";

const RECOMMENDATION_NUM = 4;

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

  const { recommendations } = useGetRecommendations({
    location: memoizedDetails?.locationName,
    category: memoizedDetails?.categoryName,
    limit: RECOMMENDATION_NUM,
  });

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
                {memoizedDetails.images.map((itm) => (
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
              {role === AuthorizeLevels.PROVIDER && (
                <PrimaryButton
                  icon="note_stack_add"
                  className="py-3"
                  // if checkOffer === undefined, still allow offer, validate by backend
                  label={!checkOffer?.hasOffer ? "Make An Offer" : "Offered"}
                  onClick={() => setShowPostOfferModal(true)}
                  disabled={checkingOffer}
                />
              )}
            </div>
            <hr className="border-base-300 my-4" />
          </main>
        </div>
      </div>
      <div className="backdrop-blur-3xl py-12">
        <div className="max-w-7xl px-6 mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-bold text-primary-400 text-2xl mt-2 inline-flex items-center gap-1 drop-shadow-lg">
              <img src="/image/tags/tag_shopping_bag.png" className="h-5" />
              <span className="">You May Also Interest</span>
            </h2>
            <div
              className="text-end text-lg cursor-pointer bg-primary-400 text-base-100 flex items-center px-6 rounded-badge hover:bg-primary-500 hover:-translate-y-1 hover:ring-2 hover:ring-offset-2 ring-primary-400/50 transition-all"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  `${siteMap(RouteEnum.Requests)}?location=${
                    memoizedDetails.locationName
                  }&category=${memoizedDetails.categoryName}`
                );
              }}
            >
              <span className="drop-shadow">More</span>
            </div>
          </div>

          {recommendations ? (
            <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
              {recommendations
                .filter((_, index) => index < RECOMMENDATION_NUM)
                .map((request) => (
                  <RequestCard
                    key={request.requestId}
                    {...request}
                    className="shadow"
                  />
                ))}
            </div>
          ) : (
            Array(RECOMMENDATION_NUM)
              .fill(null)
              .map((_, index) => <RequestCardSkeleton key={index} />)
          )}
        </div>
      </div>
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
