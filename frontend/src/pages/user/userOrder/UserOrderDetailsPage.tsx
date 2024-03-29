import { useState } from "react";
import { useParams } from "react-router-dom";
import FormModal from "../../../components/modal/FormModal";
import Skeleton from "../../../components/skeletons/Skeleton";
import Loading from "../../../components/ui/Loading";
import ProgressBar from "../../../components/ui/ProgressBar";
import ReportForm from "../../../features/forms/ReportForm";
import { useGuardedQueryContainer } from "../../../features/hooks/useGuardedQueryContainer";
import useRedirectOnCondition from "../../../features/hooks/useRedirectOnCondition";
import { OrderDetailsDisplay } from "../../../features/order/OrderDetailsDisplay";
import { ignoreCaseAndPlural } from "../../../lib/formattingUtils";
import { ControlModalContext } from "../../../services/context/ControlModalContext";
import { OrderDetailsContext } from "../../../services/context/OrderDetailsContext";
import { RouteEnum } from "../../../services/routes.config";
import { orderStatuses } from "../../../types/sharePropsModel";
import OrderStatusActions from "./OrderStatusActions";

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();
  const [showReportForm, setShowReportForm] = useState(false);
  useRedirectOnCondition(!orderId, RouteEnum.UserOrder, "Order not found");

  const { data: details, isLoading } =
    useGuardedQueryContainer().useOrderDetails(orderId!);

  if (isLoading) return <Loading />;
  if (!details) return <Skeleton />;

  return (
    <>
      <ControlModalContext.Provider
        value={{ isShow: showReportForm, setIsShow: setShowReportForm }}
      >
        <div className="mt-6 sm:mt-12 max-w-5xl w-full flex flex-col mx-auto sm:px-6">
          <div className="bg-base-100 overflow-hidden rounded-3xl sm:shadow [&_.active+div]:max-h-[2000px] [&_.active+div]:pb-6 mb-6">
            <OrderDetailsContext.Provider value={details}>
              <OrderDetailsDisplay />
              <div className="border-b border-slate-500/20 w-100"></div>
              <ProgressBar
                steps={[...orderStatuses]}
                currentStep={
                  ignoreCaseAndPlural(details.orderStatus, [
                    ...orderStatuses,
                  ]) ?? orderStatuses[0]
                }
              >
                <OrderStatusActions />
              </ProgressBar>
            </OrderDetailsContext.Provider>
          </div>
        </div>
        <FormModal>
          <ReportForm orderId={orderId!} />
        </FormModal>
      </ControlModalContext.Provider>
    </>
  );
};

export default UserOrderDetailsPage;
